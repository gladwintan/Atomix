import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>,
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const postId = new URL(request.url).searchParams.get('post')

    if (!postId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      SELECT 
        thread_likes.id
      FROM 
        thread_likes
      JOIN 
        users
      ON 
        thread_likes.user_id = users.id
      WHERE 
        users.clerk_id = ${userId}
        AND
        thread_id = ${postId}
    `;
    
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting posts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
