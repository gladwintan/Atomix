import { View, Dimensions, Text, Animated } from "react-native";
import { useCallback, useRef, useState } from "react";
import { getLikedPosts, getMyPosts, getRepliedPosts } from "@/lib/forum";
import CreatePostMenu from "./CreatePostMenu";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import MyActivityTabs from "./MyActivityTabs";

const MyActivity = () => {
  const [index, setIndex] = useState(0);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [routes] = useState([
    { key: "myPosts", title: "My Posts" },
    { key: "repliedPosts", title: "Replied" },
    { key: "likedPosts", title: "Liked" },
  ]);

  const MyPosts = () => (
    <MyActivityTabs fetchFunction={getMyPosts} scrollY={scrollY} />
  );
  const RepliedPosts = () => (
    <MyActivityTabs fetchFunction={getRepliedPosts} scrollY={scrollY} />
  );
  const LikedPosts = () => (
    <MyActivityTabs fetchFunction={getLikedPosts} scrollY={scrollY} />
  );

  const renderScene = useCallback(
    SceneMap({
      myPosts: MyPosts,
      repliedPosts: RepliedPosts,
      likedPosts: LikedPosts,
    }),
    [refreshTrigger]
  );

  const scrollY = useRef(new Animated.Value(0)).current; // Shared scroll value for FlatList and button

  const buttonOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const buttonTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 50],
    extrapolate: "clamp",
  });

  return (
    <View className="flex-1 pb-16">
      <Animated.View
        className="absolute bottom-20 right-4 z-50 bg-white shadow-md p-2 px-3 rounded-full"
        style={{
          opacity: buttonOpacity,
          transform: [{ translateY: buttonTranslateY }],
        }}
      >
        <CreatePostMenu
          onPostCreated={() => {
            setRefreshTrigger(refreshTrigger + 1);
            setIndex(0);
          }}
        />
      </Animated.View>

      <TabView
        swipeEnabled={true}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ height: 0, width: Dimensions.get("window").width }}
        lazy
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{ backgroundColor: "transparent" }}
            indicatorStyle={{
              backgroundColor: "#a6be6c",
              height: 4,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
            }}
            scrollEnabled
          />
        )}
        commonOptions={{
          label: ({ route, labelText, focused, color }) => (
            <View className="w-[100px] h-[25px] items-center justify-center">
              <Text
                className={`font-openSans text-dark-base ${focused ? "text-sm font-op" : "text-xs"} `}
                style={{ textAlign: "center", textAlignVertical: "center" }}
              >
                {labelText ?? route.title}
              </Text>
            </View>
          ),
        }}
      />
    </View>
  );
};

export default MyActivity;
