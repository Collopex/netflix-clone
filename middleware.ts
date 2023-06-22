import { NextResponse } from 'next/server';

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? ['yoursite']
    : ['http://localhost:3000', 'https://drive.google.com'];

export function middleware(req: Request) {
  const origin = req.headers.get('origin');
  console.log(origin);

  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: 'Bad request',
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

export const config = {
  matcher: '/api/:path*',
};
