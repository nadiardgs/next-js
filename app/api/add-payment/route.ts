import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const paymentName = searchParams.get('paymentName');
  const userId = searchParams.get('userId');
  const paymentAmount = searchParams.get('paymentAmount');
 
  try {
    if (!paymentName || !userId || !paymentAmount) throw new Error('Payment name, user ID and payment amount required');
    await sql`INSERT INTO Payments (Name, UserId, Amount) VALUES 
    (${paymentName}, ${userId}, ${paymentAmount});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const users = await sql`SELECT * FROM Payments WHERE Name = ${paymentName};`;
  return NextResponse.json(users.rows, { status: 200 });
}