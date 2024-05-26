import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE User (Id INT GENERATED ALWAYS AS IDENTITY, Name VARCHAR(25) NOT NULL, Password VARCHAR(25) NOT NULL, PRIMARY KEY(Id) );`;
    return NextResponse.json({ result }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}