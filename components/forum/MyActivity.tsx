import { View, Dimensions } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import {
  getLikedPosts,
  getMyPosts,
  getPosts,
  getRepliedPosts,
} from "@/lib/forum";
import { Post } from "@/types/type";
import ForumLoader from "../loader/ForumLoader";
import CreatePostMenu from "./CreatePostMenu";
import { SceneMap, TabView } from "react-native-tab-view";
import MyActivityTabs from "./MyActivityTabs";

const MyActivity = () => {
  const [index, setIndex] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [routes] = useState([
    { key: "myPosts", title: "My Posts" },
    { key: "repliedPosts", title: "Replied" },
    { key: "likedPosts", title: "Liked" },
  ]);

  const renderScene = useCallback(
    SceneMap({
      myPosts: () => <MyActivityTabs fetchFunction={getMyPosts} />,
      repliedPosts: () => <MyActivityTabs fetchFunction={getRepliedPosts} />,
      likedPosts: () => <MyActivityTabs fetchFunction={getLikedPosts} />,
    }),
    [refreshTrigger]
  );

  return (
    <View className="flex-1">
      <View className="flex-row justify-between p-2 px-4">
        <CreatePostMenu
          onPostCreated={() => {
            setRefreshTrigger(refreshTrigger + 1);
            setIndex(0);
          }}
        />
      </View>

      <TabView
        swipeEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ height: 0, width: Dimensions.get("window").width }}
        lazy
      />
    </View>
  );
};

export default MyActivity;
