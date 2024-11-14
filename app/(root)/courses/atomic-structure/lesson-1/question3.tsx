import { router } from "expo-router";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";

import CustomButton from "@/components/CustomButton";
import MultipleResponseQuestionCard from "@/components/questions/MultipleResponseQuestionCard";

const options = [
  { option: "s", selected: false },
  { option: "p", selected: false },
  { option: "d", selected: false },
  { option: "f", selected: false },
];

const answer = ["s"];
const question = "Which orbitals are shown above?";

const question3 = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <MultipleResponseQuestionCard
        options={options}
        answer={answer}
        question={question}
        nextPageUrl="/(root)/courses/atomic-structure/lesson-1/question4"
      />
    </SafeAreaView>
  );
};

export default question3;
