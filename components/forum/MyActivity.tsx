import { View, Text, Image, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { icons } from "@/constants";
import CreatePostMenu from "./CreatePostMenu";
import { useUser } from "@clerk/clerk-expo";
import { getPosts } from "@/lib/forum";
import { Post } from "@/types/type";
import ForumPostCard from "./ForumPostCard";

const MyActivity = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [myPosts, setMyPosts] = useState<Post[]>([]);
  console.log(myPosts);
  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts(userClerkId);
      setMyPosts(posts);
      console.log(posts);
    };
    if (userClerkId) fetchData();
  }, [userClerkId]);

  return (
    <ScrollView className="mb-20">
      <FlatList
        data={myPosts}
        renderItem={({ item }) => (
          <ForumPostCard
            postId={item.id.toString()}
            question={item.title}
            likeCount={item.like_count}
            replyCount={item.reply_count}
            topic={item.topic}
            difficulty={item.difficulty}
            author={item.author}
            creationDate={item.created_at}
            posts={myPosts}
            setPosts={setMyPosts}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="p-2 border-t border-neutral-200" />
        )}
        keyExtractor={(item, index) => index.toString()}
        className="py-2 bg-white"
        scrollEnabled={false}
      />

      <CreatePostMenu posts={myPosts} setPosts={setMyPosts} />
    </ScrollView>
  );
};

export default MyActivity;
