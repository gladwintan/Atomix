import { Href, router } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { graphics, icons } from "@/constants";
import { OngoingCourse } from "@/types/type";

import OngoingCourseCard from "./OngoingCourseCard";
import EmptyState from "../../EmptyState";
import Carousel from "@/components/Carousel";

const OngoingCourses = ({
  ongoingCourses,
}: {
  ongoingCourses: OngoingCourse[];
}) => {
  return (
    <Carousel
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
      ItemSeparatorComponent={() => <View className="ml-4" />}
      ListEmptyComponent={() => (
        <EmptyState
          title="No ongoing courses"
          description="Check out courses available"
          imageSrc={graphics.ongoingCoursesEmpty}
        />
      )}
      className="bg-white pb-3"
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default OngoingCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
});
