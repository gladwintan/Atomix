import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const { content, postId, parentReplyId, clerkId } = await request.json();

    if (!clerkId || !content || !postId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const response = await sql`
      INSERT INTO replies (
        author_id,
        post_id, 
        parent_reply_id, 
        content
      )
      VALUES (
        (SELECT id FROM users WHERE users.clerk_id = ${clerkId}),
        ${postId},
        ${parentReplyId},
        ${content}
      )
      RETURNING
        json_build_object(
          'replyId', replies.id,
          'parentReplyId', replies.parent_reply_id,
          'postId', replies.post_id,
          'content', replies.content,
          'author', (SELECT name FROM users WHERE users.clerk_id = ${clerkId}),
          'isAuthor', true,
          'creationDate', replies.created_at,
          'lastUpdatedDate', replies.last_updated,
          'likeCount', 0,
          'replyCount', 0,
          'userLiked', false
        )  
    `;
    
    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
