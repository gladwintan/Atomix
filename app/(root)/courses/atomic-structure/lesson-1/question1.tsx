import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView } from "react-native";

import BinaryQuestion from "@/components/questions/BinaryQuestionCard";

import { ProgressContext } from "./_layout";

const Question1 = () => {
  const setProgress = useContext(ProgressContext);

  return (
    <SafeAreaView className="h-full bg-white">
      <BinaryQuestion
        question="The above is correct"
        answer={true}
        onPressNextQuestion={() => {
          router.replace("/(root)/courses/atomic-structure/lesson-1/question2");
          setProgress && setProgress(0.4);
        }}
      />
    </SafeAreaView>
  );
};

export default Question1;
