import React, { useContext } from "react";
import { SafeAreaView } from "react-native";

import FillInTheBlankQuestionCard from "@/components/questions/FillInTheBlankQuestionCard";
import { ProgressContext } from "./_layout";
import { router } from "expo-router";

const options = ["group", "period", "decreases", "increases"];

const question = [
  { text: "Down the", index: 0 },
  { text: ",", index: -1 },
  { text: "size of atomic orbital", index: 1 },
  { text: ".", index: -1 },
  { text: "Across the", index: 2 },
  { text: ",", index: -1 },
  { text: "size of atomic orbital", index: 3 },
  { text: ".", index: -1 },
];

const answer = ["group", "increases", "period", "decreases"];

const Question2 = () => {

  const setProgress = useContext(ProgressContext)

  return (
    <SafeAreaView className="h-full bg-white">
      <FillInTheBlankQuestionCard
        question="Complete the following about the trend of atomic orbitals"
        options={options}
        questionWithBlanks={question}
        answer={answer}
        onPressNextQuestion={() => {
          router.replace("/(root)/courses/atomic-structure/lesson-1/question3");
          setProgress && setProgress(0.6);
        }}
      />
    </SafeAreaView>
  );
};

export default Question2;
