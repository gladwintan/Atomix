import { Href, router } from "expo-router";
import React from "react";
import { FlatList, Image, View, StyleSheet, Text } from "react-native";

import { icons } from "@/constants";
import { formatCourseName } from "@/lib/utils";
import { OngoingCourse } from "@/types/type";

import CompletedCourseCard from "./CompletedCourseCard";

const CompletedCourses = ({
  completedCourses,
}: {
  completedCourses: OngoingCourse[] | null;
}) => {
  return completedCourses ? (
    <FlatList
      data={completedCourses}
      renderItem={({ item }) => (
        <CompletedCourseCard
          courseName={item.course_name}
          lastLesson={item.updated_at}
          progress={item.progress}
          onPress={() =>
            router.push(
              `/courses/${formatCourseName(item.course_name)}` as Href<string>,
            )
          }
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => <View className="ml-5" />}
      className="py-2 mb-8 bg-white"
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  ) : (
    <View className="justify-center items-center mt-4 mb-8">
      <Image
        source={icons.completedEmpty}
        className="w-[160px] h-[64px]"
        resizeMode="contain"
      />
      <Text className="mt-3 text-sm text-[#161d2e] font-medium">
        No completed courses
      </Text>
      <Text className="text-sm font-light text-[#253048]">
        Continue learning or start a new course
      </Text>
    </View>
  );
};

export default CompletedCourses;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
