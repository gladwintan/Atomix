import { View, FlatList, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getPosts } from "@/lib/forum";
import { Post } from "@/types/type";
import ForumPostCard from "./ForumPostCard";
import ForumLoader from "../loader/ForumLoader";
import CreatePostMenu from "./CreatePostMenu";
import CustomButton from "../CustomButton";

const MyActivity = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [loadError, SetLoadError] = useState({ error: "" });

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showRepliedPosts, setShowRepliedPosts] = useState(false);
  const [showLikedPosts, setShowLikedPosts] = useState(false);

  useEffect(() => {
    if (userClerkId) fetchPosts();
  }, [userClerkId]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { posts, success, error } = await getPosts(userClerkId);
    if (posts) {
      setPosts(posts);
      setTimeout(() => setLoading(false), 500);
    }
    if (error) {
      SetLoadError({ error: error });
    }
  }, []);

  useEffect(() => {
    console.log(posts);
    if (showMyPosts) {
      setFilteredPosts(posts.filter((post) => post.user_is_author));
    } else if (showRepliedPosts) {
      setFilteredPosts(posts.filter((post) => post.user_replied_post));
    } else if (showLikedPosts) {
      setFilteredPosts(posts.filter((post) => post.user_liked_post));
    }
  }, [posts, showMyPosts, showRepliedPosts, showLikedPosts]);

  return loading ? (
    <ForumLoader fetchError={loadError.error} fetchPosts={fetchPosts} />
  ) : (
    <>
      <View className="flex-row justify-between p-2 px-4">
        <CustomButton
          title="Your posts"
          type="transparent"
          onPress={() => {
            setShowLikedPosts(false);
            setShowRepliedPosts(false);
            setShowMyPosts(true);
          }}
        />
        <CustomButton
          title="Replied"
          type="transparent"
          onPress={() => {
            setShowMyPosts(false);
            setShowLikedPosts(false);
            setShowRepliedPosts(true);
          }}
        />
        <CustomButton
          title="Liked"
          type="transparent"
          onPress={() => {
            setShowMyPosts(false);
            setShowRepliedPosts(false);
            setShowLikedPosts(true);
          }}
        />
        <CreatePostMenu posts={posts} setPosts={setPosts} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchPosts}
            colors={["#9Bd35A", "#689F38"]}
            progressBackgroundColor="#ffffff"
          />
        }
        className="mb-16"
      >
        <FlatList
          data={filteredPosts}
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
    </>
  );
};

export default MyActivity;
