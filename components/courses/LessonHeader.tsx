import { Href, router } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

import { icons } from "@/constants";

const LessonHeader = ({
  progress,
  courseName,
}: {
  progress: number;
  courseName: string;
}) => {
  return (
    <View className="p-2 flex-row items-center justify-center">
      <TouchableOpacity
        onPress={() =>
          router.replace(`/(root)/courses/${courseName}` as Href<string>)
        }
        className="absolute right-4"
      >
        <Image source={icons.close} tintColor="gray" className="w-6 h-6" />
      </TouchableOpacity>
      <Progress.Bar
        progress={progress}
        height={8}
        width={250}
        unfilledColor="#e2e8f0"
        borderWidth={0}
        color="#91b0f2"
      />
    </View>
  );
};

export default LessonHeader;
