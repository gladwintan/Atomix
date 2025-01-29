import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const replyId = new URL(request.url).searchParams.get("reply");

    if (!userId || !replyId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      SELECT 
        replies_likes.id
      FROM 
        replies_likes
      JOIN 
        users
      ON 
        replies_likes.user_id = users.id
      WHERE 
        users.clerk_id = ${userId}
        AND
        reply_id = ${replyId}
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting likes for reply:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
