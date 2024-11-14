import { router } from "expo-router";
import React from "react";
import { useState } from "react";
import { Image, View, Text } from "react-native";

import AnswerVerification from "./AnswerVerification";
import CustomButton from "../CustomButton";
import { MultipleResponseQuestion } from "@/types/type";

const MultipleResponseQuestionCard = ({
  options,
  question,
  answer,
  nextPageUrl,
  imageSrc,
}: MultipleResponseQuestion) => {
  const [optionsGiven, setOptionsGiven] = useState(options);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);

  const checkAnswer = () => {
    const arr = selectedAnswer.filter((selection) =>
      answer.includes(selection),
    );
    return arr.length == answer.length;
  };

  return (
    <View className="items-center p-2">
      {imageSrc && (
        <Image
          source={imageSrc}
          className="self-center w-11/12 max-w-md"
          resizeMode="contain"
        />
      )}

      <Text className="text-base text-dark-base my-3">{question}</Text>

      <View className="px-10 flex-row flex-wrap gap-x-6 gap-y-4 justify-center mt-3">
        {optionsGiven.map((option, index) => (
          <CustomButton
            key={index}
            title={option.option}
            type="answer"
            textVariant="answer"
            className={option.selected ? "bg-slate-200" : ""}
            onPress={() => {
              if (!option.selected) {
                setSelectedAnswer([...selectedAnswer, option.option]);
              } else {
                setSelectedAnswer(
                  selectedAnswer.filter(
                    (selection) => selection != option.option,
                  ),
                );
              }
              setOptionsGiven(
                optionsGiven.map((item, index) =>
                  item.option == option.option
                    ? { option: item.option, selected: !item.selected }
                    : item,
                ),
              );
            }}
          />
        ))}
      </View>

      {selectedAnswer.length == answer.length &&
        (checkAnswer() ? (
          <AnswerVerification
            correctAnswer={true}
            message="Yay! you are correct"
            onPress={() => {
              setSelectedAnswer([]);
              router.replace(nextPageUrl);
            }}
          />
        ) : (
          <AnswerVerification
            correctAnswer={false}
            message="Please try again!"
            onPress={() => {
              setSelectedAnswer([]);
              setOptionsGiven(options);
            }}
          />
        ))}
    </View>
  );
};

export default MultipleResponseQuestionCard;
