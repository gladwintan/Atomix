import { neon } from '@neondatabase/serverless';

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { totalquestion, score, clerkId } = await request.json();

    if ( !totalquestion || !score || !clerkId ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    console.log({totalquestion, score, clerkId})
    const response = await sql`
      UPDATE
        quizprogress 
      SET
       progress = CASE 
          WHEN quiz.total_question > 0 THEN (${totalquestion}::float / quiz.total_question)
          ELSE 0
        END,
        score = ${score}
      FROM
        quiz,
        users
      WHERE
        quizprogress.user_id = users.id
        AND 
        quizprogress.quiz_id = quiz.quiz_id
        AND
        users.clerk_id = ${clerkId} 
    `;

    return Response.json({ data: response }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}