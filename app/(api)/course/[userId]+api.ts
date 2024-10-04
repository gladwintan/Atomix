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
        courses.course_id,
        courses.course_name,
        courses.description
      FROM 
        courses
      ORDER BY
        courses.course_id ASC`
      
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting courses:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}