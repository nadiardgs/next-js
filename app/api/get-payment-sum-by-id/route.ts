import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
 
  try 
  {
    if (!userId) throw new Error('User ID required');
    const payments = await sql`SELECT SUM(Amount) FROM Payments WHERE UserId = ${userId};`;
    return NextResponse.json(payments.rows, { status: 200 });
  } 
  catch (error) 
  {
    return NextResponse.json({ error }, { status: 500 });
  }
}