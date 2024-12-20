import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      SELECT 
        course_progress.course_id,
        course_progress.progress,
        course_progress.updated_at,
        courses.course_name,
        course_progress.lessons_completed,
        1 AS quizzes_completed
      FROM 
        course_progress
      JOIN
        courses
      ON 
        course_progress.course_id = courses.course_id
      JOIN 
        users
      ON 
        course_progress.user_id = users.id
      WHERE 
        users.clerk_id = ${userId}
      ORDER BY
        course_progress.updated_at DESC`;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting courses:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
