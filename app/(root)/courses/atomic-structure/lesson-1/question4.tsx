import React from "react";
import { SafeAreaView } from "react-native";

import BinaryQuestionCard from "@/components/questions/BinaryQuestionCard";
import { images } from "@/courses/AtomicStructure";

const Question4 = () => {

  return (
    <SafeAreaView className="h-full bg-white">
      <BinaryQuestionCard
        nextPageUrl="/(root)/courses/atomic-structure/lesson-1/completed"
        imageSrc={images.dOrbitals}
        question="The above is correct"
        answer={true}
      />
    </SafeAreaView>
  );
};

export default Question4;
