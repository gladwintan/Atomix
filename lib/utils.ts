import { fetchAPI } from "./fetch";

export const getCourseProgress = async (courseName : string, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  const fetchData = await fetchAPI(`/(api)/course/${userClerkId}`, {
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