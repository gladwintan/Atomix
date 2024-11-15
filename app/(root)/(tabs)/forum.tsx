import ForumPostCard from "@/components/forum/ForumPostCard";
import MyActivity from "@/components/forum/MyActivity";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Forum = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <Text>Forum</Text>
      <MyActivity />
    </SafeAreaView>
  );
};

export default Forum;
