import { neon } from "@neondatabase/serverless";

export async function DELETE(request: Request) {
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
      DELETE FROM replies
      WHERE
        author_id = (SELECT id FROM users WHERE users.clerk_id = ${clerkId})
        AND
        id = ${replyId}
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error deleting reply:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
