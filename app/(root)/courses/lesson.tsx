import { View, Text, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  BinaryQuestion,
  Content,
  FillInTheBlankQuestion,
  MultipleResponseQuestion,
  Notes,
} from "@/types/type";
import { courses } from "@/data/courses/course-list";
import { SafeAreaView } from "react-native-safe-area-context";
import LessonHeader from "@/components/courses/LessonHeader";
import BinaryQuestionCard from "@/components/questions/BinaryQuestionCard";
import FillInTheBlankQuestionCard from "@/components/questions/FillInTheBlankQuestionCard";
import MultipleResponseQuestionCard from "@/components/questions/MultipleResponseQuestionCard";
import NotesCard from "@/components/courses/Notes";

const Lesson = () => {
  const {
    courseId,
    lesson,
    progress,
  }: { courseId: string; lesson: string; progress: string } =
    useLocalSearchParams();

  console.log(courseId + " " + lesson + " " + progress);
  const [lessonId, setLessonId] = useState(0);
  const [lessonContent, setLessonContent] = useState<Content[]>([]);
  const [currentProgress, setCurrentProgress] = useState(0.0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const course = courses.find(
      (course) => course.id === parseInt(courseId)
    )?.course;

    if (!course) return;

    const lessonDetails = course.lessons[parseInt(lesson)];

    if (!lessonDetails.contents || !lessonDetails.id) return;
    setLessonId(lessonDetails.id);
    setLessonContent(lessonDetails.contents);

    setCurrentProgress(parseFloat(progress));
    setCurrentIndex(
      Math.floor(currentProgress * lessonDetails.contents.length)
    );
  }, [courseId, lesson]);

  useEffect(() => {
    console.log(currentIndex);
    if (flatListRef.current?.componentDidMount) {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < lessonContent.length) {
      setCurrentIndex(currentIndex + 1);

      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
    }
    setCurrentProgress(currentIndex / lessonContent.length);
  };

  return (
    <SafeAreaView>
      <LessonHeader
        progress={currentProgress}
        courseId={courseId}
        lessonId={lessonId.toString()}
      />
      <FlatList
        ref={flatListRef}
        data={lessonContent}
        renderItem={({ item, index }) => {
          let typedItem;
          switch (item.type) {
            case "Notes":
              typedItem = item as Notes;
              return (
                <NotesCard
                  title={typedItem.title}
                  description={typedItem.description}
                  onPress={handleNext}
                />
              );
            case "Binary Question":
              typedItem = item as BinaryQuestion;
              return (
                <BinaryQuestionCard
                  question={typedItem.question}
                  answer={typedItem.answer}
                  imageSrc={typedItem.imageSrc}
                  onPressNextQuestion={handleNext}
                />
              );
            case "Fill In The Blank Question":
              typedItem = item as FillInTheBlankQuestion;
              return (
                <FillInTheBlankQuestionCard
                  question={typedItem.question}
                  questionWithBlanks={typedItem.questionWithBlanks}
                  options={typedItem.options}
                  answer={typedItem.answer}
                  imageSrc={typedItem.imageSrc}
                  onPressNextQuestion={handleNext}
                />
              );
            case "Multiple Response Question":
              typedItem = item as MultipleResponseQuestion;
              return (
                <MultipleResponseQuestionCard
                  question={typedItem.question}
                  options={typedItem.options}
                  answer={typedItem.answer}
                  imageSrc={typedItem.imageSrc}
                  onPressNextQuestion={handleNext}
                />
              );
            default:
              return <View></View>;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        className=" mt-1 mb-5 bg-white"
        pagingEnabled
        scrollEnabled={false}
        horizontal
      />
    </SafeAreaView>
  );
};

export default Lesson;
