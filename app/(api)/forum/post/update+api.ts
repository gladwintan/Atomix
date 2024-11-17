import { neon } from "@neondatabase/serverless";

export async function PUT(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { description, postId, clerkId } = await request.json();

    if (!description || !postId || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      UPDATE 
        posts 
      SET 
        description = ${description},
        last_updated = CURRENT_TIMESTAMP
      FROM 
        users
      WHERE
        posts.author_id = users.id
        AND
        posts.id = ${postId}
        AND
        users.clerk_id = ${clerkId}
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
