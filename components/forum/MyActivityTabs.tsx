import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Post } from "@/types/type";
import ForumPostCard from "./ForumPostCard";
import { useUser } from "@clerk/clerk-expo";
import { getLikedPosts, getMyPosts, getRepliedPosts } from "@/lib/forum";
import ForumLoader from "../loader/ForumLoader";

const MyActivityTabs = memo(
  ({
    fetchFunction,
  }: {
    fetchFunction: (userClerkId: string | undefined) => Promise<{
      posts?: Post[];
      success?: string;
      error?: string;
    }>;
  }) => {
    const { user } = useUser();
    const userClerkId = user?.id;

    const [loading, setLoading] = useState(true);
    const [loadError, SetLoadError] = useState({ error: "" });
    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      if (userClerkId) fetchPosts();
    }, [userClerkId]);

    const fetchPosts = useCallback(async () => {
      setLoading(true);
      const { posts, success, error } = await fetchFunction(userClerkId);

      if (posts) {
        setPosts(posts);
        setTimeout(() => setLoading(false), 500);
      }
      if (error) {
        SetLoadError({ error: error });
      }
    }, []);

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await fetchPosts();
      setRefreshing(false);
    }, []);

    return loading ? (
      <ForumLoader fetchError={loadError.error} fetchPosts={fetchPosts} />
    ) : (
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]} // For Android
            tintColor="#000" // For iOS
          />
        }
      />
    );
  }
);

export default MyActivityTabs;
