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
      INSERT INTO post_likes (
        user_id, 
        post_id
      )
      SELECT
        users.id,
        posts.id
      FROM
        users,
        posts
      WHERE
        users.clerk_id = ${clerkId}
        AND
        posts.id = ${postId}
      ON CONFLICT (user_id, post_id)
      DO NOTHING
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating like:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
