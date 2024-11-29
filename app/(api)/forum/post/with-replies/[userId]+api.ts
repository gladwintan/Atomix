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
      WITH user_info AS (
          SELECT id FROM users WHERE clerk_id = ${userId}
      ),
      post_likes_info AS (
        SELECT
          post_id,
          COUNT(*) AS likeCount,
          bool_or(user_id = (SELECT id FROM user_info)) AS userLiked
        FROM 
          post_likes
        GROUP BY 
          post_id
      ),
      reply_likes_info AS (
        SELECT
          reply_id,
          COUNT(*) AS likeCount,
          bool_or(user_id = (SELECT id FROM user_info)) AS userLiked
        FROM 
          replies_likes
        GROUP BY 
          reply_id
      ),
      replies_with_likes AS (
        SELECT
          replies.id AS replyId,
          replies.parent_reply_id AS parentReplyId,
          replies.post_id AS postId,
          replies.content AS content,
          replies.created_at AS creationDate,
          replies.last_updated AS lastUpdatedDate,
          replies.author_id AS authorId,
          COALESCE(reply_likes_info.likeCount, 0) AS likeCount,
          COALESCE(reply_likes_info.userLiked, false) AS userLiked,
          COUNT(sub_replies.id) AS replyCount
        FROM 
          replies
        LEFT JOIN 
          reply_likes_info 
        ON 
          replies.id = reply_likes_info.reply_id
        LEFT JOIN 
          replies AS sub_replies 
        ON 
          sub_replies.parent_reply_id = replies.id  -- Sub-replies for reply count
        GROUP BY 
          replies.id, 
          replies.parent_reply_id, 
          replies.post_id, 
          replies.content,
          replies.created_at, 
          replies.last_updated, 
          replies.author_id, 
          reply_likes_info.likeCount, 
          reply_likes_info.userLiked
      ),
      post_replies AS (
        SELECT
          replies_with_likes.postId,
          jsonb_agg(
            jsonb_build_object(
              'replyId', replies_with_likes.replyId,
              'parentReplyId', replies_with_likes.parentReplyId,
              'postId', replies_with_likes.postId,
              'content', replies_with_likes.content,
              'creationDate', replies_with_likes.creationDate,
              'lastUpdatedDate', replies_with_likes.lastUpdatedDate,
              'author', users.name,
              'isAuthor', replies_with_likes.authorId = (SELECT id FROM user_info),
              'likeCount', replies_with_likes.likeCount,
              'userLiked', replies_with_likes.userLiked,
              'replyCount', replies_with_likes.replyCount  -- Include reply count for each reply
            ) ORDER BY replies_with_likes.creationDate ASC
          ) AS replies
        FROM 
          replies_with_likes
        JOIN 
          users 
        ON 
          replies_with_likes.authorId = users.id
        GROUP BY 
          replies_with_likes.postId
      )
      SELECT 
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        posts.last_updated,
        post_topics.topic,
        post_users.name,
        COALESCE(post_likes_info.likeCount, 0) AS like_count,
        COUNT(DISTINCT replies.id) AS reply_count,
        CASE 
            WHEN posts.author_id = (SELECT id FROM user_info) THEN true
            ELSE false
        END AS user_is_author,
        COALESCE(post_likes_info.userLiked, false) AS user_liked_post,
        COALESCE(post_replies.replies, '[]'::jsonb) AS replies
      FROM 
        posts
      JOIN
        post_topics 
      ON 
        posts.topic = post_topics.id
      LEFT JOIN
        replies 
      ON 
        posts.id = replies.post_id
      LEFT JOIN 
        post_likes_info 
      ON 
        posts.id = post_likes_info.post_id
      LEFT JOIN 
        post_replies 
      ON 
        posts.id = post_replies.postId
      JOIN 
        users AS post_users 
      ON 
        posts.author_id = post_users.id
      WHERE 
        posts.id = ${postId}
      GROUP BY
        posts.id,
        posts.title,
        posts.description,
        posts.difficulty,
        posts.created_at,
        posts.last_updated,
        post_topics.topic,
        post_users.name,
        post_likes_info.likeCount,
        post_likes_info.userLiked,
        post_replies.replies
    `;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error getting posts:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
