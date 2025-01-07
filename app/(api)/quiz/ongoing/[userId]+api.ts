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
        quizprogress.progress,
        quizprogress.updated_at,
        course_id
      FROM 
        quizprogress
      JOIN quiz ON quizprogress.quiz_id = quiz.quiz_id
      JOIN users ON quizprogress.user_id = users.id
      WHERE 
        users.clerk_id = ${userId}
      ORDER BY
        quizprogress.updated_at DESC`
      
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting quiz:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}