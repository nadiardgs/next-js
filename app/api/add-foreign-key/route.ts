import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = 
      await sql`ALTER TABLE Payments ADD CONSTRAINT fkpayment FOREIGN KEY(userId) REFERENCES Users(Id);`;
    return NextResponse.json({ result }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}