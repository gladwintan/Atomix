import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CourseDetails from "@/components/courses/CourseDetails";
import { info, lessons } from "@/data/courses/atomic-structure";
import { getCourseProgress } from "@/lib/courses";

const AtomicStructure = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  //value of -1 indicates course not started yet; -2 for loading courses
  const [lessonsCompleted, setLessonsCompleted] = useState(-2);

  useEffect(() => {
    const fetchData = async () => {
      const course = await getCourseProgress("Atomic Structure", userClerkId);
      if (course[0]?.lessons_completed >= 0) {
        setLessonsCompleted(course[0]?.lessons_completed);
      } else {
        setLessonsCompleted(-1);
      }
    };
    if (userClerkId) fetchData();
  }, [userClerkId, lessonsCompleted]);

  return (
    <View className="h-full bg-white">
      <CourseDetails
        courseName={info.courseName}
        courseDescription={info.courseDescription}
        lessonsCompleted={lessonsCompleted}
        lessons={lessons}
        setLessonsCompleted={setLessonsCompleted}
      />
    </View>
  );
};

export default AtomicStructure;
