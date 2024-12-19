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
      <Text className="mx-4 my-2 mt-8 font-openSans-bold text-base text-dark-base">
        Explore
      </Text>
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
                `/courses/${formatCourseName(item.course_name)}` as Href
              )
            }
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View className="p-1 border-t border-neutral-100" />
        )}
        className="bg-white pb-4"
        scrollEnabled={false}
      />
    </>
  );
};

export default ExploreCourses;
