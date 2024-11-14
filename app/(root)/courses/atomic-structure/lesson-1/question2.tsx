import React from "react";
import { SafeAreaView } from "react-native";

import FillInTheBlankQuestionCard from "@/components/questions/FillInTheBlankQuestionCard";

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
  return (
    <SafeAreaView className="h-full bg-white">
      <FillInTheBlankQuestionCard
        options={options}
        questionWithBlanks={question}
        answer={answer}
        nextPageUrl="/(root)/courses/atomic-structure/lesson-1/question3"
      />
    </SafeAreaView>
  );
};

export default Question2;
