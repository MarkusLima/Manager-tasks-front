import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {

  const token = req.cookies.get('token')?.value;

  if (token) {
    const res = NextResponse.next();
    res.cookies.set('token', token || '');
    return res;
  }
  
  return NextResponse.next();

}
