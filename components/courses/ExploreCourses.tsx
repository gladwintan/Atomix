import { Href, router } from "expo-router";
import React from "react";
import { FlatList, Text, View } from "react-native";

import { formatCourseName } from "@/lib/utils";
import { ExploreCourse } from "@/types/type";

import ExploreCourseCard from "./ExploreCourseCard";

const ExploreCourses = ({
  exploreCourses,
}: {
  exploreCourses: ExploreCourse[];
}) => {
  return (
    <>
      <View className="mx-4 my-2 mt-5 flex-row items-center justify-between">
        <Text className="font-openSans-semibold text-base text-dark-base">
          Explore
        </Text>
        <Text className="text-xs font-openSans-light text-dark-base">All shown</Text>
      </View>
      <FlatList
        data={exploreCourses}
        renderItem={({ item }) => (
          <ExploreCourseCard
            courseName={item.course_name}
            description={item.description}
            totalLessons={item.total_lessons}
            completionStatus={item.completionStatus}
            onPress={() =>
              router.push(
                `/courses/${formatCourseName(item.course_name)}` as Href,
              )
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View className="p-1 border-t border-slate-200" />
        )}
        className="bg-white"
        scrollEnabled={false}
      />
    </>
  );
};

export default ExploreCourses;
