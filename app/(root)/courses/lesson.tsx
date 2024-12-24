import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
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
import CustomButton from "@/components/CustomButton";
import { updateLessonProgress } from "@/lib/courses";
import { useUser } from "@clerk/clerk-expo";
import LessonLoader from "@/components/loader/LessonLoader";

const Lesson = () => {
  const {
    courseId,
    lesson,
    progress,
  }: { courseId: string; lesson: string; progress: string } =
    useLocalSearchParams();

  const { user } = useUser();
  const userClerkId = user?.id;

  console.log(
    "course Id: " +
      courseId +
      " lesson number: " +
      lesson +
      " progress: " +
      progress
  );
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [lessonId, setLessonId] = useState("");
  const [lessonContent, setLessonContent] = useState<Content[]>([]);

  const [currentProgress, setCurrentProgress] = useState(parseFloat(progress));
  const [currentIndex, setCurrentIndex] = useState(0);

  const [lessonCompleted, setLessonCompleted] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (currentProgress < 0.0 || currentProgress > 1.0) {
      console.error("Lesson progress not found");
      setCurrentProgress(0.0);
    }

    const lessonDetails = courses.find(
      (course) => course.id === parseInt(courseId)
    )?.course?.lessons[parseInt(lesson)];

    if (!lessonDetails?.contents || !lessonDetails.id) {
      console.error(
        "Lesson details not found for lesson " +
          lesson +
          " with course ID: " +
          courseId
      );
      setLoading(false);
      setLoadError("Error loading lesson");
      return;
    }

    setCurrentIndex(
      Math.floor(currentProgress * lessonDetails.contents.length)
    );
    setLessonId(lessonDetails.id.toString());
    setLessonContent(lessonDetails.contents);
  }, [courseId, lesson, progress]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < lessonContent.length) {
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        animated: true,
        index: nextIndex,
      });
    } else if (nextIndex == lessonContent.length) {
      setLessonCompleted(true);
    }
    setCurrentProgress(nextIndex / lessonContent.length);
  };

  const scrollToSavedProgress = () => {
    if (!loading) return;
    if (currentIndex >= lessonContent.length) return;

    try {
      flatListRef.current?.scrollToIndex({
        animated: false,
        index: currentIndex,
      });
      setTimeout(() => setLoading(false), 500);
    } catch (error) {
      console.error("Error scrolling to saved progress, retrying...");
      setTimeout(() => scrollToSavedProgress(), 500);
    }
  };

  const handleLessonCompleted = () => {
    router.replace(`/(root)/courses/${courseId}`);
    updateLessonProgress(currentProgress.toString(), lessonId, userClerkId);
  };

  return (
    <SafeAreaView>
      <LessonLoader
        loading={loading}
        fetchError={loadError}
        onFetchError={() => router.replace(`/(root)/courses/${courseId}`)}
      />
      <LessonHeader
        progress={currentProgress}
        courseId={courseId}
        lessonId={lessonId}
      />
      {lessonCompleted ? (
        <View>
          <Text>Lesson Completed</Text>
          <CustomButton
            title="Back to course"
            type="continue"
            textVariant="white"
            onPress={handleLessonCompleted}
          />
        </View>
      ) : (
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
                    incorrectAnswerMessage={typedItem.incorrectAnswerMessage}
                    correctAnswerMessage={typedItem.correctAnswerMessage}
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
                    incorrectAnswerMessage={typedItem.incorrectAnswerMessage}
                    correctAnswerMessage={typedItem.correctAnswerMessage}
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
                    incorrectAnswerMessage={typedItem.incorrectAnswerMessage}
                    correctAnswerMessage={typedItem.correctAnswerMessage}
                    onPressNextQuestion={handleNext}
                  />
                );
              default:
                return <View></View>;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          className=" mt-3 pb-5 bg-white h-full"
          pagingEnabled
          scrollEnabled={false}
          onContentSizeChange={() => setTimeout(scrollToSavedProgress, 500)}
          horizontal
        />
      )}
    </SafeAreaView>
  );
};

export default Lesson;
