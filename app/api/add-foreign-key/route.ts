import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = 
      await sql`ALTER TABLE Payment ADD CONSTRAINT fk-payment FOREIGN KEY(userId) REFERENCES User(Id);`;
    return NextResponse.json({ result }, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}