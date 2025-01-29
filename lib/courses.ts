import { OngoingCourse, ExploreCourse, FilterOption } from "@/types/type";

import { fetchAPI } from "./fetch";

export const getCoursesByCompletionStatus = async (
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error loading courses" };
  }

  try {
    const [fetchData1, fetchData2] = await Promise.all([
      fetchAPI(`/(api)/course/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }),
      fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }),
    ]);

    const allCourses = fetchData1?.data;
    const startedCourses = fetchData2?.data;
    console.log(allCourses, startedCourses)
    const ongoingCourses = startedCourses.filter(
      (course: OngoingCourse) => !(parseFloat(course.progress) == 1.0)
    );
    const completedCourses = startedCourses.filter(
      (course: OngoingCourse) => parseFloat(course.progress) == 1.0
    );

    const ongoingCoursesId = ongoingCourses.map(
      (course: OngoingCourse) => course.course_id
    );
    const completedCoursesId = completedCourses.map(
      (course: OngoingCourse) => course.course_id
    );

    const exploreCourses = allCourses.map((course: ExploreCourse) => {
      if (ongoingCoursesId.includes(course.course_id)) {
        return { ...course, completionStatus: "ongoing" };
      } else if (completedCoursesId.includes(course.course_id)) {
        return { ...course, completionStatus: "completed" };
      }
      return { ...course, completionStatus: "uncompleted" };
    });

    return {
      success: "Succesfully loaded courses",
      completedCourses: completedCourses,
      ongoingCourses: ongoingCourses,
      exploreCourses: exploreCourses,
    };
  } catch (error) {
    console.error("Error while retrieving course progress from database");
    return { error: "Error loading courses" };
  }
};

export const getAllCourses = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error loading courses" };
  }

  try {
    const fetchData = await fetchAPI(`/(api)/course/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    return { success: "Successfully loaded courses", courses: fetchData?.data };
  } catch (error) {
    console.error(error);
    return { error: "Error loading courses" };
  }
};

export const getOngoingCourses = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return null;
  }

  const fetchData = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const ongoingCourses = fetchData?.data;
  return ongoingCourses?.filter(
    (course: OngoingCourse) => !(parseFloat(course.progress) == 1.0)
  );
};

export const getCourseProgress = async (
  courseId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error getting course progress" };
  }

  try {
    const fetchData = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const course = fetchData?.data.filter(
      (course: any) => course.course_id == courseId
    );
    const lessonsCompleted = course[0]?.lessons_completed ?? -1;

    return {
      success: "Successfully loaded courses",
      lessonsCompleted: lessonsCompleted,
    };
  } catch (error) {
    console.error(error);
    return { error: "Error getting course progress" };
  }
};

export const getLessonProgressses = async (
  courseId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return { error: "Error getting lesson progress" };
  }

  try {
    const fetchData = await fetchAPI(
      `/(api)/course/lesson/${userClerkId}?course=${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return {
      success: "Successfully fetched lesson progress",
      progresses: fetchData?.data[0]?.lesson_progress,
    };
  } catch (error) {
    console.error(error);
    return { error: "Error getting lesson progress" };
  }
};

export const startNewCourse = async (
  courseId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return;
  }

  try {
    await fetchAPI("/(api)/course/start", {
      method: "POST",
      body: JSON.stringify({
        courseId: courseId,
        clerkId: userClerkId,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error adding new course to database");
    return { success: false };
  }
};

export const startLesson = async (
  courseId: string,
  lessonId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return;
  }

  try {
    await fetchAPI("/(api)/course/lesson/start", {
      method: "POST",
      body: JSON.stringify({
        courseId: courseId,
        lessonId: lessonId,
        clerkId: userClerkId,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error starting lesson");
    return { success: false };
  }
};

export const updateLessonProgress = async (
  progress: string,
  lessonId: string,
  userClerkId: string | undefined
) => {
  if (!userClerkId) {
    console.error("User not authenticated");
    return;
  }

  try {
    await fetchAPI("/(api)/course/lesson/update-progress", {
      method: "PUT",
      body: JSON.stringify({
        progress: progress,
        lessonId: lessonId,
        clerkId: userClerkId,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving progress to database");
    return { success: false };
  }
};

export const sortCourses = (
  courses: ExploreCourse[],
  sortOption: string,
  descending: boolean
): ExploreCourse[] => {
  const coursesCopy = [...courses];
  let sortedCourses = coursesCopy;
  switch (sortOption) {
    case "Lessons":
      sortedCourses = coursesCopy.sort((a, b) => b.lessons - a.lessons);
      break;
    case "Quizzes":
      sortedCourses = coursesCopy.sort((a, b) => b.quizzes - a.quizzes);
      break;
    default:
  }
  return descending ? sortedCourses : sortedCourses.reverse();
};

export const filterCourses = (
  courses: ExploreCourse[],
  filterOptions: FilterOption[]
): ExploreCourse[] => {
  const filteredCourses = courses.filter((course) => {
    for (const filterOption of filterOptions) {
      switch (filterOption.value.type) {
        case "difficulty":
          if (course.difficulty === filterOption.value.option) return true;
          break;
        case "level":
          if (course.level === filterOption.value.option) return true;
          break;
        default:
          return true;
      }
    }
  });
  return filteredCourses;
};
