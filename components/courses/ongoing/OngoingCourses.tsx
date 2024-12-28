import { Href, router } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { graphics, icons } from "@/constants";
import { OngoingCourse } from "@/types/type";

import OngoingCourseCard from "./OngoingCourseCard";
import EmptyState from "../../EmptyState";

const OngoingCourses = ({
  ongoingCourses,
}: {
  ongoingCourses: OngoingCourse[] | null;
}) => {
  return (
    <FlatList
      data={ongoingCourses}
      renderItem={({ item }) => (
        <OngoingCourseCard
          courseId={item.course_id}
          courseName={item.course_name}
          lastLesson={item.updated_at}
          progress={item.progress}
          quizzesUncompleted={item.quizzes_completed}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View className="ml-5" />}
      ListEmptyComponent={() => (
        <EmptyState
          title="No ongoing courses"
          description="Check out courses available"
          imageSrc={graphics.ongoingCoursesEmpty}
        />
      )}
      className="py-2 bg-white"
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default OngoingCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
