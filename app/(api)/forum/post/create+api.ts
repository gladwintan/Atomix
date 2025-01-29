import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { title, description, difficulty, topic, clerkId } = await request.json();

    if (!clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO posts (
        author_id, 
        title,
        description,
        difficulty,
        topic
      )
      VALUES (
        (SELECT id FROM users WHERE users.clerk_id = ${clerkId}),
        ${title},
        ${description},
        ${difficulty},
        (SELECT id FROM post_topics WHERE post_topics.topic = ${topic})
      )
      RETURNING
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        posts.last_updated,
        ${topic} AS topic,
        '0' AS like_count,
        '0' AS reply_count,
        true AS is_author
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
