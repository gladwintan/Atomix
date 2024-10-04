import { AvailableCourse, Course } from "@/types/type";
import { fetchAPI } from "./fetch";

export const getUncompletedCourses = async (userClerkId: string) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }
  const fetchData1 = await fetchAPI(`/(api)/course/${userClerkId}`, {
    method: "GET"
  })
  
  const fetchData2 = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
    method: "GET"
  })

  const allCourses = fetchData1?.data
  const ongoingCourses = fetchData2?.data.map((course: Course) => course.course_name)
  return allCourses?.filter((course: AvailableCourse) => !ongoingCourses.includes(course.course_name))
}

export const getCourseProgress = async (courseName: string, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  if (!courseName) {
    console.error("Course name missing")
    return;
  }

  const fetchData = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
    method: "GET"
  })
  const courses = fetchData?.data
  return courses?.filter((course: any ) => course.course_name == courseName)
}

export const startNewCourse = async (courseName : string, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    await fetchAPI("/(api)/course/start", {
      method: "POST",
      body: JSON.stringify({
        courseName: courseName,
        clerkId: userClerkId,
      }),
    });
    
    return { success: true }
  } catch(error) {
    console.error("Error adding new course to database")
    return { success: false }
  }
}

export const updateCourseProgress = async (courseName: string, lessonCompleted: number, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    await fetchAPI("/(api)/course/update-progress", {
      method: "PUT",
      body: JSON.stringify({
        courseName: courseName,
        lessonCompleted: lessonCompleted,
        clerkId: userClerkId,
      }),
    });
    
    return { success: true }
  } catch(error) {
    console.error("Error saving progress to database")
    return { success: false }
  }

}