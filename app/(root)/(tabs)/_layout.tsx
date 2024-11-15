import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View, Text } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`h-12 w-12 rounded-full items-center justify-center ${focused ? "bg-neutral-50" : "bg-white"}`}
  >
    <Image
      source={source}
      resizeMode="contain"
      className="w-7 h-7"
      tintColor={focused ? "#0286FF" : "black"}
    />
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          paddingBottom: 0, // ios only
          overflow: "hidden",
          height: 90,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: "Course",
          headerStyle: { backgroundColor: "gray" },
          headerShown: true,
          header: () => <View className="h-16 bg-[#93b5ff]"></View>,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.course} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: "Quiz",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.quiz} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: "Forum",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.forum} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
