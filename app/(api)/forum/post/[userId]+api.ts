import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>,
) {
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
        threads.id,
        threads.title,
        threads.description,
        threads.difficulty,
        threads.created_at,
        thread_topics.topic,
        COUNT(thread_likes.id) AS likes
      FROM 
        threads
      JOIN
        thread_topics
      ON 
        threads.topic = thread_topics.id
      LEFT JOIN
        thread_likes
      ON
        threads.id = thread_likes.thread_id
      JOIN 
        users
      ON 
        threads.author_id = users.id
      WHERE 
        users.clerk_id = ${userId}
      GROUP BY
        threads.id,
        threads.title,
        threads.description,
        threads.difficulty,
        threads.created_at,
        thread_topics.topic 
      ORDER BY
        threads.created_at DESC
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting posts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
