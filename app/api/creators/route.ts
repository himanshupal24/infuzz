import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Creator from '@/models/Creator';
import {
  calculateEngagementRate,
  calculateCreatorScore,
  assignBadge,
} from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const engagementRate = calculateEngagementRate(
      Number(body.avgLikes),
      Number(body.avgComments),
      Number(body.followers)
    );

    const creatorScore = calculateCreatorScore({
      engagementRate,
      audienceCountry: body.audienceCountry,
      audienceAge: body.audienceAge,
      audienceGender: body.audienceGender,
      postsPerMonth: Number(body.postsPerMonth),
      instagram: body.instagram,
      youtube: body.youtube,
      tiktok: body.tiktok,
      pricePost: Number(body.pricePost) || 0,
      priceStory: Number(body.priceStory) || 0,
      followers: Number(body.followers),
    });

    const badge = assignBadge(creatorScore);

    // Determine primary platform
    let platform = 'instagram';
    if (body.youtube && !body.instagram) platform = 'youtube';
    else if (body.tiktok && !body.instagram) platform = 'tiktok';
    else if (body.instagram && body.youtube && body.tiktok) platform = 'multi';

    const creator = await Creator.create({
      name: body.name,
      email: body.email,
      country: body.country,
      platform,
      instagram: body.instagram || '',
      youtube: body.youtube || '',
      tiktok: body.tiktok || '',
      whatsapp: body.whatsapp || '',
      niche: body.niche,
      followers: Number(body.followers),
      avgLikes: Number(body.avgLikes),
      avgComments: Number(body.avgComments),
      postsPerMonth: Number(body.postsPerMonth),
      audienceCountry: body.audienceCountry || '',
      audienceAge: body.audienceAge || '',
      audienceGender: body.audienceGender || '',
      pricePost: Number(body.pricePost) || 0,
      priceStory: Number(body.priceStory) || 0,
      priceYoutube: Number(body.priceYoutube) || 0,
      contentType: body.contentType || [],
      engagementRate,
      creatorScore,
      badge,
      status: 'pending',
    });

    return NextResponse.json(
      { success: true, creator, message: 'Successfully joined Infuzz! Check your dashboard.' },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This email is already registered on Infuzz.' },
        { status: 400 }
      );
    }
    console.error('POST /api/creators error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const niche = searchParams.get('niche');
    const country = searchParams.get('country');
    const minFollowers = searchParams.get('minFollowers');
    const maxFollowers = searchParams.get('maxFollowers');
    const minEngagement = searchParams.get('minEngagement');
    const hiddenGems = searchParams.get('hiddenGems');
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const leaderboard = searchParams.get('leaderboard');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);

    const query: Record<string, any> = {};

    if (email) query.email = email.toLowerCase();
    if (niche) query.niche = niche;
    if (country) query.country = country;
    if (status) query.status = status;

    if (minFollowers || maxFollowers) {
      query.followers = {};
      if (minFollowers) query.followers.$gte = parseInt(minFollowers);
      if (maxFollowers) query.followers.$lte = parseInt(maxFollowers);
    }

    if (minEngagement) {
      query.engagementRate = { $gte: parseFloat(minEngagement) };
    }

    if (hiddenGems === 'true') {
      query.followers = { $lt: 50000 };
      query.engagementRate = { $gt: 8 };
    }

    if (leaderboard === 'true') {
      query.status = 'approved';
    }

    const creators = await Creator.find(query)
      .sort({ creatorScore: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, creators, count: creators.length });
  } catch (error: any) {
    console.error('GET /api/creators error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
