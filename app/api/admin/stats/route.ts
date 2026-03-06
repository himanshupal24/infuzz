import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Creator from '@/models/Creator';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const [total, approved, pending, rejected, hiddenGems] = await Promise.all([
      Creator.countDocuments(),
      Creator.countDocuments({ status: 'approved' }),
      Creator.countDocuments({ status: 'pending' }),
      Creator.countDocuments({ status: 'rejected' }),
      Creator.countDocuments({ followers: { $lt: 50000 }, engagementRate: { $gt: 8 } }),
    ]);

    return NextResponse.json({
      success: true,
      stats: { total, approved, pending, rejected, hiddenGems },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
