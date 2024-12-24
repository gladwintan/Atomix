import { Lesson, LessonWithProgress } from "@/types/type";

export const createLessonDetailsWithProgress = (
  lessons: Lesson[],
  lessonProgresses: {
    progress: number;
    status: "uncompleted" | "ongoing" | "completed";
    completed_at: string;
  }[]
): LessonWithProgress[] => {
  const lessonsWithProgress: LessonWithProgress[] = [];
  for (let i = 0; i < lessons.length; i++) {
    const lessonProgress = lessonProgresses[i];
    if (lessonProgress) {
      lessonsWithProgress[i] = {
        ...lessons[i],
        progress: lessonProgress.progress,
        status: lessonProgress.status,
        lastCompletedAt: lessonProgress.completed_at,
      };
    } else {
      lessonsWithProgress[i] = {
        ...lessons[i],
        progress: 0.0,
        status: "uncompleted",
        lastCompletedAt: null,
      };
    }
  }
  return lessonsWithProgress;
};
