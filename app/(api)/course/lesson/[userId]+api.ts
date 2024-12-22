import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const courseId = new URL(request.url).searchParams.get("course");

    if (!userId || !courseId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      SELECT 
        COALESCE(json_agg(lp), '[]'::json) AS lesson_progress
      FROM (
        SELECT 
          l.lesson_id,
          lp.status,
          lp.progress,
          lp.started_at,
          lp.completed_at
        FROM 
          lessons l
        JOIN 
          lesson_progress lp 
        ON 
          lp.lesson_id = l.lesson_id 
        JOIN
          users
        ON
          users.id = lp.user_id 
        WHERE 
          l.course_id = ${courseId}
          AND
          users.clerk_id = ${userId}
        ORDER BY 
          l.sequence_number
      ) lp;
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting lesson progress:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
