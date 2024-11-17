import { neon } from "@neondatabase/serverless";

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { content, replyId, clerkId } = await request.json();

    if (!content || !replyId || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      UPDATE 
        replies 
      SET 
        content = ${content},
        last_updated = CURRENT_TIMESTAMP
      FROM 
        users
      WHERE
        replies.author_id = users.id
        AND
        replies.id = ${replyId}
        AND
        users.clerk_id = ${clerkId}
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error updating reply:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
