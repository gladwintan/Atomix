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
        progress.progress,
        progress.updated_at,
        courses.course_name
      FROM 
        progress
      JOIN
        courses
      ON 
        progress.course_id = courses.course_id
      WHERE 
        progress.user_id = ${userId}
      ORDER BY
        progress.updated_at DESC`
      
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting courses:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}