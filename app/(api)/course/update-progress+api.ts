import { neon } from "@neondatabase/serverless";

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { courseName, lessonCompleted, clerkId } = await request.json();

    if (!courseName || !lessonCompleted || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      UPDATE 
        progress 
      SET 
        lessons_completed = ${lessonCompleted},
        progress = (${lessonCompleted}::float / courses.total_lessons)
      FROM 
        courses,
        users
      WHERE
        progress.user_id = users.id
        AND 
        progress.course_id = courses.course_id
        AND
        users.clerk_id = ${clerkId} 
        AND
        courses.course_name = ${courseName}
        AND
        progress.lessons_completed < ${lessonCompleted} 
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
