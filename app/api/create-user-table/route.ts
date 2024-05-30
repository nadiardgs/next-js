import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS User (
        Id SERIAL PRIMARY KEY, 
        Name VARCHAR(25), 
        Email VARCHAR(25));`;
    return NextResponse.json({ result }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}



