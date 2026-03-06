import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'infuzz-dev-secret-change-in-prod';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@infuzz.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface JWTPayload {
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function generateToken(email: string): string {
  return jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  // Check cookie
  const cookie = request.cookies.get('admin_token');
  return cookie?.value || null;
}

export function isAdminAuthenticated(request: NextRequest): boolean {
  const token = getTokenFromRequest(request);
  if (!token) return false;
  const decoded = verifyToken(token);
  return decoded?.role === 'admin';
}
