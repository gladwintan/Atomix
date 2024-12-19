import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { replyId, clerkId } = await request.json();

    if (!clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO replies_likes (
        user_id, 
        reply_id
      )
      SELECT
        users.id,
        replies.id
      FROM
        users,
        replies
      WHERE
        users.clerk_id = ${clerkId}
        AND
        replies.id = ${replyId}
      ON CONFLICT (user_id, reply_id)
      DO NOTHING
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating like for reply:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
