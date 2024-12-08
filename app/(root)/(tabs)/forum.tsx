import CustomButton from "@/components/CustomButton";
import SearchBar from "@/components/SearchBar";
import FilterMenu from "@/components/forum/FilterMenu";
import ForumPostCard from "@/components/forum/ForumPostCard";
import SortMenu from "@/components/forum/SortMenu";
import ForumLoader from "@/components/loader/ForumLoader";
import { icons } from "@/constants";
import { getPosts } from "@/lib/forum";
import { Post } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
} from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Forum = () => {
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
      setFilteredPosts(posts);
      console.log(posts);
      setTimeout(() => setLoading(false), 500);
    }
    if (error) {
      SetLoadError({ error: error });
    }
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
          className="flex-1"
        >
          {/* Quick links */}
          <View className="justify-around items-center flex-row my-6">
            <View className="items-center">
              <CustomButton
                type="transparent"
                textClassName="hidden"
                IconLeft={() => (
                  <Image
                    source={icons.profile}
                    tintColor="white"
                    className="w-6 h-6"
                  />
                )}
                className="bg-secondary-600 rounded-md p-1"
                onPress={() => router.push("/(root)/forum/my-activity")}
              />
              <Text className="font-openSans text-2xs mt-1">My Activity</Text>
            </View>
            <View className="items-center">
              <CustomButton
                type="transparent"
                textClassName="hidden"
                IconLeft={() => (
                  <Image
                    source={icons.add}
                    tintColor="white"
                    className="w-6 h-6"
                  />
                )}
                className="bg-secondary-600 rounded-md p-1"
                onPress={() => router.push("/(root)/forum/my-activity")}
              />
              <Text className="font-openSans text-2xs mt-1">Post</Text>
            </View>
          </View>

          {/* Discover section */}
          <View className="p-2 justify-end flex-row items-center">
            <Text className="absolute left-3 font-openSans-bold">Discover</Text>
            <FilterMenu posts={posts} setPosts={setFilteredPosts} />
            <SortMenu posts={filteredPosts} setPosts={setFilteredPosts} />
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
      )}
    </SafeAreaView>
  );
};

export default Forum;
