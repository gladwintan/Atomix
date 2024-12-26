import { View, Text, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Content } from "@/types/type";
import { courses } from "@/data/courses/course-list";
import { SafeAreaView } from "react-native-safe-area-context";
import LessonHeader from "@/components/courses/LessonHeader";
import BinaryQuestionCard from "@/components/questions/BinaryQuestionCard";
import FillInTheBlankQuestionCard from "@/components/questions/FillInTheBlankQuestionCard";
import MultipleResponseQuestionCard from "@/components/questions/MultipleResponseQuestionCard";
import NotesCard from "@/components/courses/Notes";
import { useUser } from "@clerk/clerk-expo";
import LessonLoader from "@/components/loader/LessonLoader";
import LessonCompletionCard from "@/components/courses/LessonCompletionCard";

const Lesson = () => {
  const {
    courseId,
    lesson,
    progress,
  }: { courseId: string; lesson: string; progress: string } =
    useLocalSearchParams();

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
    )?.lessons[parseInt(lesson)];

    if (
      !lessonDetails?.contents ||
      lessonDetails?.contents.length == 0 ||
      !lessonDetails.id
    ) {
      console.error(
        "Lesson details not found for lesson " +
          lesson +
          " with course ID: " +
          courseId
      );
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

  return (
    <SafeAreaView className="flex-1">
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
        <LessonCompletionCard courseId={courseId} lessonId={lessonId} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={lessonContent}
          renderItem={({ item, index }) => {
            switch (item.type) {
              case "Notes":
                return (
                  <NotesCard
                    title={item.title}
                    description={item.description}
                    onPress={handleNext}
                  />
                );
              case "Binary Question":
                return (
                  <BinaryQuestionCard
                    question={item.question}
                    answer={item.answer}
                    imageSrc={item.imageSrc}
                    incorrectAnswerMessage={item.incorrectAnswerMessage}
                    correctAnswerMessage={item.correctAnswerMessage}
                    onPressNextQuestion={handleNext}
                  />
                );
              case "Fill In The Blank Question":
                return (
                  <FillInTheBlankQuestionCard
                    question={item.question}
                    questionWithBlanks={item.questionWithBlanks}
                    options={item.options}
                    answer={item.answer}
                    imageSrc={item.imageSrc}
                    incorrectAnswerMessage={item.incorrectAnswerMessage}
                    correctAnswerMessage={item.correctAnswerMessage}
                    onPressNextQuestion={handleNext}
                  />
                );
              case "Multiple Response Question":
                return (
                  <MultipleResponseQuestionCard
                    question={item.question}
                    options={item.options}
                    answer={item.answer}
                    imageSrc={item.imageSrc}
                    incorrectAnswerMessage={item.incorrectAnswerMessage}
                    correctAnswerMessage={item.correctAnswerMessage}
                    onPressNextQuestion={handleNext}
                  />
                );
              default:
                return <Text>No content</Text>;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
          className="mt-3 bg-white"
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
