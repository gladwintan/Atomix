import { OngoingCourse, Course, ExploreCourse } from "@/types/type";
import { fetchAPI } from "./fetch";

export const getCoursesByCompletionStatus = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return
  }

  try {
    const fetchData1 = await fetchAPI(`/(api)/course/get`, {
      method: "GET"
    })

    const fetchData2 = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
      method: "GET"
    })

    const allCourses = fetchData1?.data
    const startedCourses = fetchData2?.data
    
    const ongoingCourses = startedCourses.filter((course: OngoingCourse) => !(parseFloat(course.progress) == 1.0))
    const completedCourses = startedCourses.filter((course: OngoingCourse) => (parseFloat(course.progress) == 1.0))

    const ongoingCourseNames = ongoingCourses.map((course: OngoingCourse) => course.course_name)
    const completedCourseNames = completedCourses.map((course: OngoingCourse) => course.course_name)

    const exploreCourses = allCourses?.map((course: ExploreCourse) => {
      if (ongoingCourseNames.includes(course.course_name)) {
        return { ...course, completionStatus: "ongoing" }
      } else if (completedCourseNames.includes(course.course_name)) {
        return { ...course, completionStatus: "completed" }
      }
      return { ...course, completionStatus: "uncompleted" }
    })

    return {
      completedCourses: completedCourses.length == 0 ? null : completedCourses,
      ongoingCourses: ongoingCourses.length == 0 ? null : ongoingCourses,
      exploreCourses: exploreCourses
    }
  } catch (error) {
    console.error(error)
    console.error("Error while retrieving course progress from database")
  }
  
}

export const getOngoingCourses = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return null;
  }

  const fetchData = await fetchAPI(`/(api)/course/ongoing/${userClerkId}`, {
    method: "GET"
  })
  const ongoingCourses = fetchData?.data
  return ongoingCourses?.filter((course: OngoingCourse) => !(parseFloat(course.progress) == 1.0))
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