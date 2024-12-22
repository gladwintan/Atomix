import { neon } from "@neondatabase/serverless";

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { progress, lessonId, clerkId } = await request.json();

    if (!progress || !lessonId || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      WITH updated_lesson_progress AS (
        UPDATE 
          lesson_progress
        SET 
          progress = ${progress},
          status = 
            CASE 
              WHEN ${progress} = 1.0 THEN 'completed'
              ELSE 'ongoing'
            END,
          completed_at = 
            CASE 
              WHEN ${progress} = 1.0 THEN NOW()
              ELSE NULL
            END
        FROM 
          users
        WHERE 
          lesson_progress.lesson_id = ${lessonId} 
          AND 
          users.clerk_id = ${clerkId}
          AND 
          lesson_progress.user_id = users.id
        RETURNING 
          lesson_id, 
          course_progress_id, 
          progress
      )
      UPDATE 
        course_progress
      SET 
        lessons_completed = lessons.sequence_number,
        progress = (lessons.sequence_number::float / courses.lessons)
      FROM
        courses,
        lessons,
        updated_lesson_progress ulp
      WHERE 
        ulp.progress = 1
        AND 
        ulp.lesson_id = lessons.lesson_id
        AND
        course_progress.course_id = courses.course_id
        AND
        course_progress.progress_id = ulp.course_progress_id
        AND
        course_progress.lessons_completed < lessons.sequence_number
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error updating progress:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
