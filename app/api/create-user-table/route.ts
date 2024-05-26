import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE IF NOT EXISTS Users (
        Id SERIAL PRIMARY KEY, 
        Name VARCHAR(25) UNIQUE NOT NULL, 
        Password VARCHAR(25) NOT NULL
        );`;
    return NextResponse.json({ result }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}