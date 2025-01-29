import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CourseDetails from "@/components/courses/CourseDetails";
import { getCourseProgress } from "@/lib/courses";

const AtomicStructure = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  //value of -1 indicates course not started yet; -2 for loading courses
  const [lessonsCompleted, setLessonsCompleted] = useState(-2);

  useEffect(() => {
    const fetchData = async () => {
      const { progress, success, error } = await getCourseProgress(
        "1",
        userClerkId
      );
      console.log(progress);
    };
    if (userClerkId) fetchData();
  }, [userClerkId, lessonsCompleted]);

  return (
    <View className="h-full bg-white">
      {/* <CourseDetails courseId={1} /> */}
    </View>
  );
};

export default AtomicStructure;
