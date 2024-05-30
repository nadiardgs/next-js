import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request, response: Response) {

    try 
    {
        const users = await sql`SELECT Id, Name, Email FROM Users;`;
        return NextResponse.json(users.rows, { status: 200 });
    }
    catch (error)
    { 
        return NextResponse.json({ error }, { status: 500 });
    }
}