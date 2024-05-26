import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE Payment (Id INT GENERATED ALWAYS AS IDENTITY, Name VARCHAR(25), UserId INT, Value INT, PRIMARY KEY (Id), CONSTRAINT fkuser FOREIGN KEY (UserId) REFERENCES User(Id) );`;
    return NextResponse.json({ result }, { status: 200 });
  } 
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}