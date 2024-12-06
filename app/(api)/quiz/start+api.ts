import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { quizTopic, clerkId } = await request.json();

    if (!quizTopic || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO quizprogress (
        user_id, 
        quiz_id
      )
      SELECT 
        users.id,
        quiz.quiz_id 
      FROM 
        users,
        quiz
      WHERE 
        users.clerk_id = ${clerkId} 
        AND
        quiz.quiz_topic = ${quizTopic}  
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}