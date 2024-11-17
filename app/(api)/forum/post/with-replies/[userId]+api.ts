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
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        posts.last_updated,
        post_topics.topic,
        post_users.name,
        COUNT(DISTINCT post_likes.id) AS like_count,
        COUNT(DISTINCT replies.id) AS reply_count,
        COALESCE(json_agg(json_build_object(
          'replyId', replies.id,
          'content', replies.content,
          'createdAt', replies.created_at,
          'lastUpdated', replies.last_updated,
          'parentReplyId', replies.parent_reply_id,
          'author', reply_users.name,
          'is_author', CASE 
            WHEN replies.author_id = (SELECT id FROM users WHERE clerk_id = ${userId}) THEN true
            ELSE false
          END
        )) FILTER (WHERE replies.id IS NOT NULL), '[]') AS replies,
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
        users AS post_users
      ON 
        posts.author_id = post_users.id
      LEFT JOIN 
        users AS reply_users
      ON
        replies.author_id = reply_users.id
      WHERE 
        posts.id = ${postId}
      GROUP BY
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        post_topics.topic,
        post_users.name 
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting posts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
