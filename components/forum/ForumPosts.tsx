import { View, FlatList, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getPosts } from "@/lib/forum";
import { Post } from "@/types/type";
import ForumPostCard from "./ForumPostCard";
import ForumLoader from "../loader/ForumLoader";

const ForumPosts = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [loadError, SetLoadError] = useState({ error: "" });

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (userClerkId) fetchPosts();
  }, [userClerkId]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { posts, success, error } = await getPosts(userClerkId);
    if (posts) {
      setPosts(posts);
      console.log(posts);
      setTimeout(() => setLoading(false), 500);
    }
    if (error) {
      SetLoadError({ error: error });
    }
  }, []);

  return loading ? (
    <ForumLoader fetchError={loadError.error} fetchPosts={fetchPosts} />
  ) : (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={fetchPosts}
          colors={["#9Bd35A", "#689F38"]}
          progressBackgroundColor="#ffffff"
        />
      }
      className="mb-20"
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ForumPostCard
            postId={item.id.toString()}
            title={item.title}
            description={item.description}
            likeCount={item.like_count}
            replyCount={item.reply_count}
            topic={item.topic}
            difficulty={item.difficulty}
            author={item.author}
            isAuthor={item.user_is_author}
            userLikedPost={item.user_liked_post}
            userRepliedPost={item.user_replied_post}
            creationDate={item.created_at}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-1.5 border-t border-neutral-200" />
        )}
        keyExtractor={(item, index) => item.id.toString()}
        className="py-2 bg-white"
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default ForumPosts;
