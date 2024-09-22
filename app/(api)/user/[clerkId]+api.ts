import { neon } from '@neondatabase/serverless';

export async function GET(request: Request, { clerkId }: Record<string, string>) {
  try { 
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`SELECT name FROM users WHERE clerk_id = ${clerkId}`

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting username:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}