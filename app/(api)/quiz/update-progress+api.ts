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
    console.log(score, progress, quizId, clerkId)

    const existingRecord = await sql`
      SELECT 1 
      FROM quizprogress 
      JOIN users ON quizprogress.user_id = users.id
      WHERE quizprogress.quiz_id = ${quizId} 
        AND users.clerk_id = ${clerkId}
    `;

    if (existingRecord.length > 0){ 
      const updateResponse = await sql`
        UPDATE quizprogress
        SET progress = ${null},
        score = ${null}
        FROM users
        WHERE quizprogress.quiz_id = ${quizId}
        AND users.clerk_id = ${clerkId}
        AND quizprogress.user_id = users.id
      `;
      if (updateResponse.length > 0) {
        return Response.json(
          { message: "Quiz progress updated successfully." },
          { status: 200 }
        );
      } else {
        const insertResponse = await sql`
          INSERT INTO quizprogress (user_id, quiz_id)
          SELECT u.id, ${quizId}
          FROM users u
          WHERE u.clerk_id = ${clerkId}
        `;
  
        if (insertResponse.length > 0) {
          return Response.json(
            { message: "Quiz progress created successfully." },
            { status: 201 }
          );
        } else {
          return Response.json(
            { error: "Failed to insert new quiz progress." },
            { status: 500 }
          );
        };};};
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}