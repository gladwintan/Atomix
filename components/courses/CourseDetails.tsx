import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Image, View, Text, FlatList, StyleSheet } from "react-native";

import LessonCard from "@/components/courses/LessonCard";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { startNewCourse } from "@/lib/courses";
import { Lesson } from "@/types/type";
import { useEffect } from "react";

const CourseDetails = ({ courseId }: { courseId: number }) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  useEffect(() => {}, []);
  return (
    <>
      {/* <View className="p-3 px-5 bg-primary-100 mx-3 rounded-2xl flex-row items-center">
        <View className="w-3/4">
          <Text className="text-base text-dark-base font-openSans-semibold">
            {courseName}
          </Text>
          <Text className="mt-1 text-sm text-dark-light font-openSans">
            {courseDescription}
          </Text>
        </View>
        <View className="p-2.5 bg-white rounded-full absolute right-4">
          <Image
            source={icons.chemistry}
            tintColor="#93B5FF"
            resizeMode="contain"
            className="w-12 h-12"
          />
        </View>
      </View>

      <View className="border-b border-slate-300 mt-5 mx-3 pb-1 flex-row items-center">
        <Image
          source={icons.lesson}
          tintColor="#253048"
          resizeMode="contain"
          className="w-4 h-4"
        />
        <Text className="text-dark-base font-openSans-semibold text-sm ml-1">
          Lessons
        </Text>
      </View>

      <FlatList
        data={lessons}
        renderItem={({ item }) => (
          <LessonCard
            id={item.id}
            title={item.title}
            description={item.description}
            lessonsCompleted={lessonsCompleted}
            time={item.time}
            difficulty={item.difficulty}
            lastLesson={item.lastLesson}
            onPress={() => router.push(item.link)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />

      {lessonsCompleted == -1 && (
        <CustomButton
          title="Start course"
          onPress={() => {
            startNewCourse(courseName, userClerkId);
            setLessonsCompleted(0);
          }}
          className="w-1/2 self-center"
        />
      )} */}
    </>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    paddingLeft: 20,
    paddingTop: 15,
  },
});
