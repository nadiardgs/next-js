import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get('userName');
  const userEmail = searchParams.get('userEmail');
 
  try {
    if (!userName || !userEmail) throw new Error('Username and email required');
    await sql`INSERT INTO Users (Name, Email) VALUES (${userName}, ${userEmail});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}