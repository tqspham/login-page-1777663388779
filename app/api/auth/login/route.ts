import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

type LoginRequest = {
  username: string;
  password: string;
};

type UserRecord = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
};

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: LoginRequest = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from('login_page_1777663388779_users')
      .select('*')
      .or(
        `username.eq.${username},email.eq.${username}`
      )
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const user = data as UserRecord;

    // Simple password comparison (in production, use bcrypt)
    const isValidPassword = password === user.password_hash;

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true, userId: user.id },
      { status: 200 }
    );

    response.cookies.set('authenticated', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Connection failed. Please try again.' },
      { status: 500 }
    );
  }
}
