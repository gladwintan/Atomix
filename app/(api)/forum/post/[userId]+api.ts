import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>,
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      SELECT 
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        posts.last_updated,
        post_topics.topic,
        users.name AS author,
        COUNT(DISTINCT post_likes.id) AS like_count,
        COUNT(DISTINCT replies.id) AS reply_count,
        CASE 
          WHEN posts.author_id = (SELECT id FROM users WHERE clerk_id = ${userId}) THEN true
          ELSE false
        END AS is_author
      FROM 
        posts
      JOIN
        post_topics
      ON 
        posts.topic = post_topics.id
      LEFT JOIN
        post_likes
      ON
        posts.id = post_likes.post_id
      LEFT JOIN 
        replies
      ON
        posts.id = replies.post_id
      JOIN 
        users
      ON 
        posts.author_id = users.id
      GROUP BY
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        post_topics.topic,
        users.name 
      ORDER BY
        posts.created_at DESC
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting posts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
