import { neon } from '@neondatabase/serverless';

export async function GET(request: Request, { userId }: Record<string, string>) {
  try { 
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      SELECT 
        users.name,
        users.id
      FROM 
        users
      WHERE 
        users.clerk_id = ${userId}
      ORDER BY
        users.id DESC`
      
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}