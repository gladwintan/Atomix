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
              `/courses/${formatCourseName(item.course_name)}` as Href<string>,
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
  );
};

export default ExploreCourses;
