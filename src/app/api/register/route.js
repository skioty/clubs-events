// src/app/api/register/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ 
        message: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        message: 'Invalid email format' 
      }, { status: 400 });
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ 
        message: 'Password must be at least 8 characters long' 
      }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ 
        message: 'User already exists',
        details: 'An account with this email address already exists'
      }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ 
      message: 'User created successfully', 
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Register API error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'PrismaClientKnownRequestError') {
      return NextResponse.json({ 
        message: 'Database error occurred',
        details: error.message
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Registration failed',
      details: error.message
    }, { status: 500 });
  }
}
