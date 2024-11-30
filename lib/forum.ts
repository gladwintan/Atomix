import { fetchAPI } from "./fetch";


export const getPosts = async (
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return;
  }

  const fetchData = await fetchAPI(`/(api)/forum/post/${userClerkId}`, {
    method: "GET",
  });
  return fetchData?.data;
};

export const createPost = async (
  title: string,
  description: string,
  difficulty: string,
  topic: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error creating post" };
  }
  
  if (!title) {
    return { error: "Question cannot be blank" }
  }
    
  if (!topic) {
    return { error: "Topic cannot be blank" }
  }

  try {
    const fetchData = await fetchAPI("/(api)/forum/post/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        difficulty: difficulty,
        topic: topic,
        clerkId: userClerkId,
      }),
    });
    return { success: fetchData.data[0] };
  } catch (error) {
    console.error("Error adding new post to database");
    return { error: "Error creating post" };
  }
};

export const deletePost = async (
  postId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error deleting post" };
  }
  
  if (!postId) {
    return { error: "Post Id is not available"}
  }

  try {
    await fetchAPI("/(api)/forum/post/delete", {
      method: "DELETE",
      body: JSON.stringify({
        postId: postId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully deleted post" };
  } catch (error) {
    console.error("Error deleting post from database");
    return { error: "Error deleting post" };
  }
};

export const updatePost = async (
  description: string,
  postId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Something went wrong"}
  }
  
  if (!postId) {
    console.error("post ID is missing");
    return { error: "Something went wrong"}
  }
  
  if (!description) {
    console.error("Description is blank");
    return { error: "Description is blank"}
  }
  
  try {
    await fetchAPI("/(api)/forum/post/update", {
      method: "PUT",
      body: JSON.stringify({
        description: description,
        postId: postId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully updated post" };
  } catch (error) {
    console.error("Error updating post in database");
    return { error: "Something went wrong" };
  }
};

export const getLikeForPost = async (
  postId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error getting like"};
  }

  if (!postId) {
    return { error: "Post Id is not available"}
  }

  const fetchData = await fetchAPI(`/(api)/forum/likes-post/${userClerkId}?post=${postId}`, {
    method: "GET",
  });

  return fetchData?.data[0];
};

export const createLikeForPost = async (
  postId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error creating like" };
  }
  
  if (!postId) {
    return { error: "Post Id is not available"}
  }

  try {
    await fetchAPI("/(api)/forum/likes-post/create", {
      method: "POST",
      body: JSON.stringify({
        postId: postId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully created like" };
  } catch (error) {
    console.error("Error adding new like to database");
    return { error: "Error creating like" };
  }
};

export const removeLikeForPost = async (
  postId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error deleting like" };
  }
  
  if (!postId) {
    return { error: "Post Id is not available"}
  }

  try {
    await fetchAPI("/(api)/forum/likes-post/delete", {
      method: "DELETE",
      body: JSON.stringify({
        postId: postId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully deleted like" };
  } catch (error) {
    console.error("Error deleting like from database");
    return { error: "Error deleting like" };
  }
};

export const getPostDetailsWithReplies = async (
  postId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error fetching post" };
  }
  
  if (!postId) {
    return { error: "Post Id is not available"}
  }

  try {
    const fetchData = await fetchAPI(`/(api)/forum/post/with-replies/${userClerkId}?post=${postId}`, {
      method: "GET",
    });
    
    return { success: "Post data fetched successfully", postDetails: fetchData?.data?.[0] };
  } catch (error) {
    console.error("Error fetching post details");
    return { error: "Error fetching post" };
  }
};

export const createReply = async (
  content: string,
  postId: string,
  parentReplyId: string | null,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error creating post" };
  }
  
  if (!content) {
    return { error: "Reply cannot be blank" }
  }
    
  if (!postId) {
    return { error: "Post ID is missing" }
  }

  try {
    const fetchData = await fetchAPI("/(api)/forum/reply/create", {
      method: "POST",
      body: JSON.stringify({
        content: content,
        postId: postId,
        parentReplyId: parentReplyId,
        clerkId: userClerkId,
      }),
    });
    return { success: "Successfully created reply", newReply: fetchData.data[0]?.json_build_object };
  } catch (error) {
    console.error("Error adding new reply to database");
    return { error: "Error creating reply" };
  }
};

export const deleteReply = async (
  replyId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error deleting post" };
  }
  
  if (!replyId) {
    return { error: "Reply Id is not available"}
  }

  try {
    await fetchAPI("/(api)/forum/reply/delete", {
      method: "DELETE",
      body: JSON.stringify({
        replyId: replyId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully deleted reply" };
  } catch (error) {
    console.error("Error deleting reply from database");
    return { error: "Error deleting reply" };
  }
};

export const updateReply = async (
  content: string,
  replyId: string,
  userClerkId: string | undefined,
) => {
  console.log(content)
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Something went wrong"}
  }
  
  if (!replyId) {
    console.error("post ID is missing");
    return { error: "Something went wrong"}
  }
  
  if (!content) {
    console.error("Description is blank");
    return { error: "Description is blank"}
  }
  
  try {
    await fetchAPI("/(api)/forum/reply/update", {
      method: "PUT",
      body: JSON.stringify({
        content: content,
        replyId: replyId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully updated reply" };
  } catch (error) {
    console.error("Error updating reply in database");
    return { error: "Something went wrong" };
  }
};

export const getLikeForReply = async (
  replyId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error getting like for reply"};
  }

  if (!replyId) {
    return { error: "Reply Id is not available"}
  }

  const fetchData = await fetchAPI(`/(api)/forum/likes-reply/${userClerkId}?reply=${replyId}`, {
    method: "GET",
  });

  return fetchData?.data[0];
};

export const createLikeForReply = async (
  replyId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error creating like for reply" };
  }
  
  if (!replyId) {
    return { error: "Reply Id is not available"}
  }

  try {
    await fetchAPI("/(api)/forum/likes-reply/create", {
      method: "POST",
      body: JSON.stringify({
        replyId: replyId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully created like for reply" };
  } catch (error) {
    console.error("Error adding new like for reply to database");
    return { error: "Error creating like for reply" };
  }
};

export const removeLikeForReply = async (
  replyId: string,
  userClerkId: string | undefined,
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error deleting like" };
  }
  
  if (!replyId) {
    return { error: "Reply Id is not available"}
  }

  try {
    await fetchAPI("/(api)/forum/likes-reply/delete", {
      method: "DELETE",
      body: JSON.stringify({
        replyId: replyId,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully deleted like for reply" };
  } catch (error) {
    console.error("Error deleting like for reply from database");
    return { error: "Error deleting like for reply" };
  }
};