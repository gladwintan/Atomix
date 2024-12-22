import { Href, router } from "expo-router";
import React from "react";
import { FlatList, Image, View, StyleSheet, Text } from "react-native";

import { graphics, icons } from "@/constants";
import { formatCourseName } from "@/lib/utils";
import { OngoingCourse } from "@/types/type";

import CompletedCourseCard from "./CompletedCourseCard";
import EmptyState from "../EmptyState";

const CompletedCourses = ({
  completedCourses,
}: {
  completedCourses: OngoingCourse[];
}) => {
  return (
    <FlatList
      data={completedCourses}
      renderItem={({ item }) => (
        <CompletedCourseCard
          courseId={item.course_id}
          courseName={item.course_name}
          lastLesson={item.updated_at}
          progress={item.progress}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View className="ml-5" />}
      ListEmptyComponent={() => (
        <EmptyState
          title="No completed courses"
          description="Continue learning or start a new course"
          imageSrc={graphics.completedCoursesEmpty}
        />
      )}
      className="py-2 bg-white"
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default CompletedCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
