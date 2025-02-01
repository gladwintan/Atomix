import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import LessonCard from "@/components/courses/lesson/LessonCard";
import CustomButton from "@/components/CustomButton";
import { useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import { courses } from "@/data/courses/course-list";
import {
  getCourseProgress,
  getLessonProgressses,
  startLesson,
  startNewCourse,
} from "@/lib/courses";
import { LessonWithProgress } from "@/types/type";
import { icons } from "@/constants";
import CourseDetailsLoader from "@/components/loader/CourseDetailsLoader";
import { createLessonDetailsWithProgress } from "@/lib/coursesUtils";

const CourseDetails = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const { courseId }: { courseId: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [lessons, setLessons] = useState<LessonWithProgress[]>([]);
  const [lessonsCompleted, setLessonsCompleted] = useState(-1);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, userClerkId]);

  const fetchCourseDetails = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    const [courseProgress, lessonProgresses] = await Promise.all([
      getCourseProgress(courseId, userClerkId),
      getLessonProgressses(courseId, userClerkId),
    ]);

    if (courseProgress.error || lessonProgresses.error) {
      setLoadError(courseProgress.error || lessonProgresses.error || "");
      return;
    }

    if (courseProgress.lessonsCompleted != -1) {
      setLessonsCompleted(courseProgress.lessonsCompleted);
    }

    const course = courses.find((course) => course.id === parseInt(courseId));
    
    if (!course) {
      setLoadError("Course not found");
      return;
    }

    setCourseName(course.name);
    setCourseDescription(course.description);

    if (lessonProgresses.progresses) {
      setLessons(
        createLessonDetailsWithProgress(
          course.lessons,
          lessonProgresses.progresses
        )
      );
    }

    setTimeout(() => setLoading(false), 500);
  }, [userClerkId, courseId]);

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-white">
      {loading ? (
        <CourseDetailsLoader
          fetchError={loadError}
          fetchDetails={fetchCourseDetails}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={fetchCourseDetails}
              colors={["#9Bd35A", "#689F38"]}
              progressBackgroundColor="#ffffff"
            />
          }
          stickyHeaderIndices={[1]}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="p-3 px-4 bg-primary-100 mx-3 rounded-2xl flex-row items-center">
            <View className="w-10/12 pr-1.5">
              <Text className="text-base text-dark-base font-openSans-semibold">
                {courseName}
              </Text>
              <Text className="mt-1 text-sm text-dark-lighter font-openSans">
                {courseDescription}
              </Text>
            </View>
            <View className="p-2.5 bg-white rounded-full">
              <Image
                source={icons.chemistry}
                tintColor="#93B5FF"
                resizeMode="contain"
                className="w-10 h-10"
              />
            </View>
          </View>

          <View className="bg-white border-b border-gray-200 mt-5 mx-3 pb-1 flex-row items-center">
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
            renderItem={({ item, index }) => (
              <LessonCard
                id={item.id}
                courseId={courseId}
                title={item.title}
                description={item.description}
                lessonsCompleted={lessonsCompleted}
                time={item.time}
                difficulty={item.difficulty}
                lessonSequence={index + 1}
                lastLesson={index == lessons.length - 1}
                lastCompletedAt={item.lastCompletedAt}
                status={item.status}
                progress={item.progress}
              />
            )}
            keyExtractor={(item, index) => item.id.toString()}
            contentContainerStyle={{ padding: 20, paddingBottom: 0 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          {lessonsCompleted == -1 && (
            <CustomButton
              title="Start course"
              textVariant="white"
              onPress={() => {
                startNewCourse(courseId, userClerkId);
                setLessonsCompleted(0);
              }}
              className="w-1/2 self-center"
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CourseDetails;
