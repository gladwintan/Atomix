import { neon } from "@neondatabase/serverless";

export async function GET(
  request: Request,
  { userId }: Record<string, string>
) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!userId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      WITH curr_user AS (
        SELECT id 
        FROM users 
        WHERE clerk_id = ${userId} 
      ),
      engagement_stats AS (
        SELECT
          posts.id AS post_id,
          COUNT(DISTINCT post_likes.id) AS like_count,
          COUNT(DISTINCT replies.id) AS reply_count,
          COUNT(DISTINCT 
            CASE 
              WHEN post_likes.user_id = (SELECT id FROM curr_user) 
              THEN post_likes.id 
            END
          ) > 0 AS user_liked_post,
          COUNT(DISTINCT 
            CASE 
              WHEN replies.author_id = (SELECT id FROM curr_user) 
              THEN replies.id 
            END
          ) > 0 AS user_replied_post
        FROM 
          posts
        LEFT JOIN 
          post_likes ON posts.id = post_likes.post_id
        LEFT JOIN 
          replies ON posts.id = replies.post_id
        GROUP BY 
          posts.id
      )
      SELECT 
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        posts.last_updated,
        post_topics.topic,
        users.name AS author,
        es.like_count,
        es.reply_count,
        es.user_liked_post,
        es.user_replied_post,
        (posts.author_id = (SELECT id FROM curr_user))::BOOLEAN AS user_is_author,
        ( 
          es.like_count * 1.0 + 
          es.reply_count * 2.0
        ) AS engagement_score
      FROM
        posts
      JOIN
        post_topics ON posts.topic = post_topics.id
      JOIN
        users ON posts.author_id = users.id
      JOIN
        engagement_stats es ON posts.id = es.post_id
      ORDER BY 
        engagement_score DESC, 
        posts.created_at DESC
      LIMIT 
        5
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting posts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
