import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Creator from '@/models/Creator';
import { isAdminAuthenticated } from '@/lib/auth';

export async function PATCH(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const { id, status } = await request.json();

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const creator = await Creator.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).lean();

    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, creator });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
