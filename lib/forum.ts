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
    await fetchAPI("/(api)/forum/post/create", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        difficulty: difficulty,
        topic: topic,
        clerkId: userClerkId,
      }),
    });

    return { success: "Successfully created post" };
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
    return { error: "Error deleting like" };
  }
  
  if (!postId) {
    return { error: "Post Id is not available"}
  }

  const fetchData = await fetchAPI(`/(api)/forum/post/with-replies/${userClerkId}?post=${postId}`, {
    method: "GET",
  });

  return fetchData?.data;
};

export const isPostAuthor = async (
  postId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error deleting like" };
  }
  
  if (!postId) {
    return { error: "Post Id is not available"}
  }

  const fetchData = await fetchAPI(`/(api)/forum/post/author/${userClerkId}?post=${postId}`, {
    method: "GET",
  });

  return fetchData?.data;
};

