import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function DELETE(request: Request, response: Response) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    try
    {
        const users = await sql`DELETE FROM Payments WHERE Name = ${name};`;
        return NextResponse.json(users.rows, { status: 200 });
    }
    catch (error)
    { 
        return NextResponse.json({ error }, { status: 500 });
    }
}