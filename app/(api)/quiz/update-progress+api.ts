import { quiz } from '@/data/quiz/AcidBaseQuiz';
import { Clerk } from '@clerk/clerk-expo';
import { neon } from '@neondatabase/serverless';

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { score, progress, quizId, clerkId } = await request.json();

    if ( !score || !progress || !quizId || !clerkId ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }
    
    const response = await sql`
      UPDATE quizprogress
      SET progress = ${progress},
      score = ${score}
      FROM users
      WHERE quizprogress.quiz_id = ${quizId}
      AND users.clerk_id = ${clerkId}
      AND quizprogress.user_id = users.id
      `
      return Response.json({error: "Failed to insert new quiz progress"})
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}