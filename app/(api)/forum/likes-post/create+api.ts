import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { postId, clerkId } = await request.json();

    if (!clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO thread_likes (
        user_id, 
        thread_id
      )
      SELECT
        users.id,
        threads.id
      FROM
        users,
        threads
      WHERE
        users.clerk_id = ${clerkId}
        AND
        threads.id = ${postId}
      ON CONFLICT (user_id, thread_id)
      DO NOTHING
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating like:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
