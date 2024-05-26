import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS Payment (
        Id SERIAL PRIMARY KEY, 
        Name VARCHAR(25) NOT NULL, 
        UserId INT, 
        Amount INT);`;
    return NextResponse.json({ result }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}