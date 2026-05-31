import { NextRequest, NextResponse } from 'next/server';

const BACKEND = 'https://lekhacduy.io.vn/api/survey';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('[survey proxy error]', err);
    return NextResponse.json(
      { status: 'error', message: 'Không thể kết nối máy chủ.' },
      { status: 500 }
    );
  }
}
