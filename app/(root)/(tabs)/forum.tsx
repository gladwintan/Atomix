import CustomButton from "@/components/CustomButton";
import ForumPosts from "@/components/forum/ForumPosts";
import MyActivity from "@/components/forum/MyActivity";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Forum = () => {
  const [showMyActivity, setShowMyActivity] = useState(false);
  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex-row space-x-2 border-b-2 border-neutral-100">
        <CustomButton
          title="Forum"
          type="transparent"
          textClassName={`${showMyActivity && "font-openSans"}`}
          className={`p-2 w-1/2 ${!showMyActivity && "bg-secondary-50"}`}
          onPress={() => setShowMyActivity(false)}
        />
        <CustomButton
          title="My activity"
          type="transparent"
          textClassName={`${!showMyActivity && "font-openSans"}`}
          className={`p-2 w-1/2 ${showMyActivity && "bg-secondary-50"}`}
          onPress={() => setShowMyActivity(true)}
        />
      </View>
      {showMyActivity ? <MyActivity /> : <ForumPosts />}
    </SafeAreaView>
  );
};

export default Forum;
