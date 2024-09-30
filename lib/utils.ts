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