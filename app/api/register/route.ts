import { NextResponse } from 'next/server';

import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response('User already exists!', {
        status: 403,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, name, hashedPassword },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    throw new Error(error);
  }
}
