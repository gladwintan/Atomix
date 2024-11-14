import { router } from "expo-router";
import React, { useContext } from "react";
import { View, Text, SafeAreaView } from "react-native";

import CustomButton from "@/components/CustomButton";
import MultipleResponseQuestionCard from "@/components/questions/MultipleResponseQuestionCard";
import { ProgressContext } from "./_layout";

const options = [
  { option: "s", selected: false },
  { option: "p", selected: false },
  { option: "d", selected: false },
  { option: "f", selected: false },
];

const answer = ["s"];
const question = "Which orbitals are shown above?";

const question3 = () => {

  const setProgress = useContext(ProgressContext)

  return (
    <SafeAreaView className="h-full bg-white">
      <MultipleResponseQuestionCard
        options={options}
        answer={answer}
        question={question}
        onPressNextQuestion={() => {
          router.replace("/(root)/courses/atomic-structure/lesson-1/question4");
          setProgress && setProgress(0.8);
        }}
      />
    </SafeAreaView>
  );
};

export default question3;
