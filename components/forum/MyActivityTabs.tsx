import { View, Text, RefreshControl, Animated, FlatList } from "react-native";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Post } from "@/types/type";
import ForumPostCard from "./ForumPostCard";
import { useUser } from "@clerk/clerk-expo";
import ForumPostListLoader from "../loader/ForumPostListLoader";
import OptionsMenu from "./OptionsMenu";
import SearchBar from "../SearchBar";

const MyActivityTabs = memo(
  ({
    fetchFunction,
    scrollY,
    ListEmptyComponent,
  }: {
    fetchFunction: (userClerkId: string | undefined) => Promise<{
      posts?: Post[];
      success?: string;
      error?: string;
    }>;
    scrollY: Animated.Value;
    ListEmptyComponent: React.ComponentType<any> | React.ReactElement | null;
  }) => {
    const { user } = useUser();
    const userClerkId = user?.id;

    const [loading, setLoading] = useState(true);
    const [loadError, SetLoadError] = useState({ error: "" });
    const [refreshing, setRefreshing] = useState(false);

    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

    useEffect(() => {
      if (userClerkId) fetchPosts();
    }, [userClerkId]);

    const fetchPosts = useCallback(async () => {
      setLoading(true);
      const { posts, success, error } = await fetchFunction(userClerkId);

      if (posts) {
        setPosts(posts);
        setFilteredPosts(posts);
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

    const handleSearch = async (searchQuery: string) => {
      if (!userClerkId) return;
      setLoading(true);

      const query = searchQuery.toLowerCase().trim();
      const { posts, success, error } = await fetchFunction(userClerkId);

      if (posts) {
        setPosts(posts);
        const searchResults = posts.filter(
          (post: Post) =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.topic.toLowerCase().includes(query) ||
            query === ""
        );
        setFilteredPosts(searchResults);
        setTimeout(() => setLoading(false), 500);
      }
      if (error) {
        SetLoadError({ error: error });
      }
    };

    return (
      <Animated.ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]} // For Android
            tintColor="#d1d5db" // For iOS
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        className="bg-white"
      >
        <View className="px-2 mt-1 flex-row justify-end items-center h-12">
          <OptionsMenu
            posts={filteredPosts}
            setPosts={setFilteredPosts}
            setLoading={setLoading}
            menuContainerClassName="absolute left-3"
          />
          <SearchBar handleSearch={handleSearch} />
        </View>
        {loading ? (
          <ForumPostListLoader
            fetchError={loadError.error}
            fetchPosts={fetchPosts}
          />
        ) : (
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
            ListEmptyComponent={ListEmptyComponent}
            scrollEnabled={false}
            className="pb-2"
          />
        )}
      </Animated.ScrollView>
    );
  }
);

export default MyActivityTabs;
