import React, { useContext } from "react";
import { SafeAreaView } from "react-native";

import BinaryQuestionCard from "@/components/questions/BinaryQuestionCard";
import { images } from "@/courses/AtomicStructure";
import { router } from "expo-router";
import { ProgressContext } from "./_layout";

const Question4 = () => {

  const setProgress = useContext(ProgressContext)

  return (
    <SafeAreaView className="h-full bg-white">
      <BinaryQuestionCard
        imageSrc={images.dOrbitals}
        question="The above is correct"
        answer={true}
        onPressNextQuestion={() => {
          router.replace("/(root)/courses/atomic-structure/lesson-1/completed");
          setProgress && setProgress(1);
        }}
      />
    </SafeAreaView>
  );
};

export default Question4;
