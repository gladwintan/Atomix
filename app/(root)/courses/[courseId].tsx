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
import LessonCard from "@/components/courses/LessonCard";
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
import { Lesson } from "@/types/type";
import { icons } from "@/constants";
import CourseDetailsLoader from "@/components/loader/CourseDetailsLoader";

const CourseDetails = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const { courseId }: { courseId: string } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState({ error: "" });

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonsCompleted, setLessonsCompleted] = useState(-1);

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId, userClerkId]);

  const fetchCourseDetails = useCallback(async () => {
    setLoading(true);
    setLoadError({ error: "" });

    const [courseProgress, lessonProgresses] = await Promise.all([
      getCourseProgress(courseId, userClerkId),
      getLessonProgressses(courseId, userClerkId),
    ]);

    if (courseProgress.error) {
      setLoadError({ error: courseProgress.error });
      return;
    }
    if (lessonProgresses.error) {
      setLoadError({ error: lessonProgresses.error });
      return;
    }

    setLessonsCompleted(courseProgress.lessonsCompleted);

    const course = courses.find(
      (course) => course.id === parseInt(courseId)
    )?.course;

    if (lessonProgresses.progress && course) {
      const lessons = course.lessons;
      for (let i = 0; i < lessons.length; i++) {
        const lessonProgress = lessonProgresses.progress[i];
        if (lessonProgress) {
          lessons[i] = {
            ...lessons[i],
            progress: lessonProgress.progress,
            status: lessonProgress.status,
            lastCompletedAt: lessonProgress.completed_at,
          };
        } else {
          lessons[i] = {
            ...lessons[i],
            progress: 0.0,
            status: "uncompleted",
            lastCompletedAt: null,
          };
        }
      }
    }

    if (course) {
      setCourseName(course.courseName);
      setCourseDescription(course.courseDescription);
      setLessons(course.lessons);
    }
    setTimeout(() => setLoading(false), 500);
  }, [userClerkId, courseId]);

  return (
    <SafeAreaView edges={["left", "right"]} className="flex-1 bg-white">
      {loading ? (
        <CourseDetailsLoader
          fetchError={loadError.error}
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
          <View className="p-3 px-5 bg-primary-100 mx-3 rounded-2xl flex-row items-center">
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

          <View className="bg-white border-b border-slate-300 pt-5 mx-3 pb-1 flex-row items-center">
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
                title={item.title}
                description={item.description}
                lessonsCompleted={lessonsCompleted}
                time={item.time}
                difficulty={item.difficulty}
                lastLesson={index == lessons.length - 1}
                lastCompletedAt={item.lastCompletedAt}
                onPress={() => {
                  router.replace(
                    `/(root)/courses/lesson?courseId=${courseId}&lesson=${index}&progress=${item.progress == 1.0 ? 0.0 : item.progress}`
                  );
                  startLesson(courseId, item.id.toString(), userClerkId);
                }}
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
