import { View, FlatList, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { getPosts } from "@/lib/forum";
import { Post } from "@/types/type";
import ForumPostCard from "./ForumPostCard";
import ForumLoader from "../loader/ForumLoader";
import { Text } from "react-native";
import { Searchbar } from "react-native-paper";
import { icons } from "@/constants";
import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";

const ForumPosts = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [loadError, SetLoadError] = useState({ error: "" });

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (userClerkId) fetchPosts();
  }, [userClerkId]);

  const fetchPosts = useCallback(async () => {
    if (!userClerkId) return;

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
  }, [userClerkId]);

  const [searchQuery, setSearchQuery] = useState(""); // For search input

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.topic.toLowerCase().includes(query) ||
          query === ""
      )
    );
  }, [searchQuery]);

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
    >
      <Searchbar
        placeholder="Search posts"
        onChangeText={setSearchQuery}
        value={searchQuery}
        className="bg-transparent border border-gray-300 w-10/12 self-center mt-4"
        inputStyle={{
          fontFamily: "openSans",
          fontSize: 14,
          color: "#161d2e",
        }}
        icon={icons.search}
        iconColor="#6b7280"
      />
      <View className="p-2 justify-end flex-row">
        <FilterMenu posts={posts} setPosts={setFilteredPosts} />
        <SortMenu posts={posts} setPosts={setFilteredPosts} />
      </View>
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
        keyExtractor={(item, index) => item?.id.toString()}
        className="py-2 bg-white"
        scrollEnabled={false}
        ListEmptyComponent={() => (
          <View className="h-[50vh] border">
            <Text>No posts to show</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ForumPosts;
