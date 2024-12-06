import { neon } from '@neondatabase/serverless';

export async function GET(request: Request) {
  try { 
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    const response = await sql`
      SELECT 
        quiz.quiz_id,
        quiz.quiz_topic,
        quiz.description,
        quiz.total_question
      FROM 
        quiz
      ORDER BY
        quiz.quiz_id ASC`
      
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting quiz:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}