import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'ok',
    app: 'Platinum Project API (Vercel Serverless Fullstack)',
    version: '1.0.0',
    time: new Date().toISOString(),
  });
}
