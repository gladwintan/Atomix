import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`
      SELECT 
        courses.course_id,
        courses.course_name,
        courses.description,
        courses.lessons,
        courses.quizzes,
        courses.difficulty,
        courses.level,
        courses.subject
      FROM 
        courses
      ORDER BY
        courses.course_id ASC`;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting courses:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
