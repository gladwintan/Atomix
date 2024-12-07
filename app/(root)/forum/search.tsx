import { View, Text, FlatList, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import ForumPostCard from "@/components/forum/ForumPostCard";
import { Post } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { getPosts } from "@/lib/forum";
import ForumLoader from "@/components/loader/ForumLoader";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { router } from "expo-router";

const SearchPage = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const { query } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [loadError, SetLoadError] = useState({ error: "" });

  const [searchResults, setSearchResults] = useState<Post[]>([]);

  useEffect(() => {
    handleSearch(query as string);
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!userClerkId) return;

    const query = searchQuery.toLowerCase().trim();
    const posts = await fetchPosts();
    setSearchResults(
      posts.filter(
        (post: Post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.topic.toLowerCase().includes(query) ||
          query === ""
      )
    );
    setTimeout(() => setLoading(false), 500);
  };

  const fetchPosts = useCallback(async () => {
    if (!userClerkId) return;

    setLoading(true);
    const { posts, success, error } = await getPosts(userClerkId);
    if (posts) {
      return posts;
    }
    if (error) {
      SetLoadError({ error: error });
    }
  }, [userClerkId]);

  return (
    <SafeAreaView>
      <View className="items-end">
        <CustomButton
          title="forum"
          textVariant="back"
          type="back"
          IconLeft={() => (
            <Image
              source={icons.arrowLeft}
              tintColor="#364463"
              className="w-3 h-3 mr-1"
            />
          )}
          className="absolute left-3 top-1"
          onPress={() => router.replace("/(root)/(tabs)/forum")}
        />
        <SearchBar handleSearch={handleSearch} />
      </View>
      {loading ? (
        <ForumLoader
          fetchError={loadError.error}
          fetchPosts={async () => await handleSearch(query as string)}
        />
      ) : (
        <FlatList
          data={searchResults}
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
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
