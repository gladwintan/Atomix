import Carousel from "@/components/Carousel";
import CustomButton from "@/components/CustomButton";
import SearchBar from "@/components/SearchBar";
import ForumPostCard from "@/components/forum/ForumPostCard";
import OptionsMenu from "@/components/forum/OptionsMenu";
import ForumMainPageLoader from "@/components/loader/ForumMainPageLoader";
import { icons } from "@/constants";
import { getPosts, getTrendingPosts } from "@/lib/forum";
import { Post } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { Href, router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const quickLinks = [
  {
    title: "My Activity",
    icon: icons.profile,
    link: "(root)/forum/my-activity",
  },
  {
    title: "Create post",
    icon: icons.post,
    link: "(root)/forum/my-activity",
  },
];

const Forum = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [loadError, SetLoadError] = useState({ error: "" });

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (userClerkId) fetchPosts();
  }, [userClerkId]);

  const fetchPosts = useCallback(async () => {
    if (!userClerkId) return;

    setLoading(true);
    SetLoadError({ error: "" });
    const [allPosts, trendingPosts] = await Promise.all([
      getPosts(userClerkId),
      getTrendingPosts(userClerkId),
    ]);

    if (allPosts.posts) {
      setPosts(allPosts.posts);
      setFilteredPosts(allPosts.posts);
    }

    if (trendingPosts.posts) {
      setTrendingPosts(trendingPosts.posts);
    }

    if (allPosts.error) {
      SetLoadError({ error: allPosts.error });
      return;
    } else if (trendingPosts.error) {
      SetLoadError({ error: trendingPosts.error });
      return;
    }

    setTimeout(() => setLoading(false), 500);
  }, [userClerkId]);

  return (
    <SafeAreaView edges={["top", "right", "left"]} className="flex-1 bg-white">
      <View className="items-end h-12 border-b-[0.5px] border-neutral-100 justify-center">
        <Text className="absolute left-3 font-openSans-bold text-base text-dark-base">
          Forum
        </Text>

        <SearchBar
          handleSearch={(searchQuery) =>
            router.push(`/(root)/forum/search?query=${searchQuery}`)
          }
        />
      </View>

      {loading ? (
        <ForumMainPageLoader
          fetchError={loadError.error}
          fetchPosts={fetchPosts}
        />
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
          stickyHeaderIndices={[3]}
          className="flex-1"
        >
          {/* Quick links */}
          <FlatList
            data={quickLinks}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(item.link as Href)}
                className="bg-white border-[0.5px] border-neutral-100 p-2 px-3.5 rounded-lg shadow-sm flex-row items-center justify-center space-x-1.5"
              >
                <View className="bg-secondary-50 p-2 rounded-full">
                  <Image
                    source={item.icon}
                    tintColor="#364463"
                    className="w-3.5 h-3.5"
                  />
                </View>
                <Text className="font-openSans text-xs text-dark-base">
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => <View className="w-4" />}
            className="p-4 mt-1 mb-5 bg-white"
            scrollEnabled
            horizontal
          />

          {/* Trending section */}
          <View className="left-3 flex-row space-x-1 items-center">
            <Text className="font-openSans-bold text-dark-base">Trending</Text>
            <Image
              source={icons.trending}
              tintColor="#161d2e"
              className="w-4 h-4"
            />
          </View>
          <Carousel
            data={trendingPosts}
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
            keyExtractor={(item, index) => item?.id.toString()}
            className="pt-2"
            containerClassName="mb-8"
          />

          {/* Discover section */}
          <View className="p-2 justify-end flex-row items-center bg-white">
            <Text className="absolute left-3 font-openSans-bold text-dark-base">
              Discover
            </Text>
            <OptionsMenu
              posts={posts}
              setPosts={setFilteredPosts}
              setLoading={setLoading}
            />
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
              <View className="h-[55vh] border">
                <Text>No posts to show</Text>
              </View>
            )}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Forum;
