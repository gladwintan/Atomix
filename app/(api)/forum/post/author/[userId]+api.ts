import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>,
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const postId = new URL(request.url).searchParams.get('post')

    if (!userId || !postId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      SELECT 
        1 AS is_author
      FROM 
        posts
      JOIN 
        users
      ON 
        posts.author_id = users.id
      WHERE 
        posts.id = ${postId}
        AND 
        users.clerk_id = ${userId}
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error verifying authorship for user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
