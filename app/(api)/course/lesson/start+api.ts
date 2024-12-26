import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { courseId, lessonId, clerkId } = await request.json();

    if (!courseId || !lessonId || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO lesson_progress (
        user_id,
        course_progress_id,
        lesson_id
      )
      SELECT
        users.id,
        course_progress.progress_id,
        ${lessonId}
      FROM 
        users
      JOIN
        course_progress
      ON
        course_progress.user_id = users.id
      WHERE 
        users.clerk_id = ${clerkId}
        AND
        course_progress.course_id = ${courseId} 
      ON CONFLICT 
        (user_id, lesson_id)
      DO UPDATE SET
        status = 'ongoing',
        progress = 0.0
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
