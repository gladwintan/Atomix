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
    className={`h-12 w-12 items-center justify-center bg-white text-neutral-400`}
  >
    {focused && (
      <View className="absolute top-0 h-[5px] rounded-b-md bg-primary-600 w-full"></View>
    )}
    <Image
      source={source}
      className="w-6 h-6"
      tintColor={focused ? "#8FABE5" : "#737373"}
    />
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontFamily: "openSans",
          fontSize: 10,
          height: 20,
          marginTop: 1,
        },
        tabBarStyle: {
          backgroundColor: "white",
          paddingBottom: 65, // ios only
          overflow: "hidden",
          height: 85,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "relative",
        },
        tabBarActiveTintColor: "#8FABE5",
        tabBarInactiveTintColor: "#737373",
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
