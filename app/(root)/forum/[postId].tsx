import { View, Text } from "react-native";
import React from "react";
import Post from "@/components/forum/Post";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PostPage = () => {
  const { postId } = useLocalSearchParams();

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-white">
      <Post postId={postId as string} />
    </SafeAreaView>
  );
};

export default PostPage;
