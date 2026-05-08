'use server';

import { cookies } from 'next/headers';

export async function verifyAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return { success: true };
  }
  
  return { success: false, error: 'Incorrect password' };
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  return cookieStore.get('admin_auth')?.value === 'true';
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_auth');
  return { success: true };
}
