import { ExploreQuizType, OngoingQuiz } from "@/types/type";
import { fetchAPI } from "./fetch";
import { quiz } from "@/courses/AcidBaseQuiz";

export const getQuizByCompletionStatus = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return
  }

  try {
    const fetchData1 = await fetchAPI(`/(api)/quiz/get`, {
      method: "GET"
    })

    const fetchData2 = await fetchAPI(`/(api)/quiz/ongoing/${userClerkId}`, {
      method: "GET"
    })

    const allQuiz = fetchData1?.data
    const startedQuiz = fetchData2?.data
  
    const noQuizStarted = startedQuiz.filter((quiz:OngoingQuiz) => quiz.progress == 0.0 )
    const ongoingQuiz = startedQuiz.filter((quiz: OngoingQuiz) => quiz.progress !== 1.0)
    const completedQuiz = startedQuiz.filter((quiz: OngoingQuiz) => quiz.progress == 1.0)
    
    const ongoingQuizNames = ongoingQuiz.map((quiz: OngoingQuiz) => quiz.course_name)
    const completedQuizNames = completedQuiz.map((quiz: OngoingQuiz) => quiz.course_name)

    const exploreQuiz = allQuiz?.map((quiz: ExploreQuizType) => {
      if (ongoingQuizNames.includes(quiz.course_name)) {
        return { ...quiz, completionStatus: "ongoing" }
      } else if (completedQuizNames.includes(quiz.course_name)) {
        return { ...quiz, completionStatus: "completed" }
      }
      return { ...quiz, completionStatus: "uncompleted" }
    })

    return {
      completedQuiz: completedQuiz.length == 0 ? null : completedQuiz,
      ongoingQuiz: ongoingQuiz.length == 0 ? null : ongoingQuiz,
      exploreQuiz: exploreQuiz,
      noQuizStarted : noQuizStarted.length == 0 ? true : false
    }
  } catch (error) {
    console.error(error)
    console.error("Error while retrieving quiz progress from database")
  }
  
}

export const selectQuiz = async(userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return
  }

  try {
    const fetchData1 = await fetchAPI(`/(api)/quiz/get1`, {
      method:"GET"
    })

  const selectQuiz = fetchData1?.data
  
  return{
    selectQuiz: selectQuiz
  }
  } catch(error) {
    console.log(error)
    console.error("Error while retrieving quiz progress from database")
  }
}

export const getOngoingQuiz = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return null;
  }

  const fetchData = await fetchAPI(`/(api)/quiz/ongoing/${userClerkId}`, {
    method: "GET"
  })
  const ongoingQuiz = fetchData?.data
  return ongoingQuiz?.filter((quiz: OngoingQuiz) => quiz.progress == 1.0)
}

export const getQuizProgress = async (quizName: string, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  if (!quizName) {
    console.error("quiz name missing")
    return;
  }

  const fetchData = await fetchAPI(`/(api)/quiz/ongoing/${userClerkId}`, {
    method: "GET"
  })
  const Quiz = fetchData?.data
  return Quiz?.filter((quiz: any ) => quiz.quiz_topic == quizName)
}

export const startNewQuiz = async (quizId : number, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    await fetchAPI("/(api)/quiz/start", {
      method: "POST",
      body: JSON.stringify({
        quizId: quizId,
        clerkId: userClerkId
      }),
    });
    
    return { success: true }
  } catch(error) {
    console.error("Error adding new quiz to database")
    return { success: false }
  }
}
export const updateQuizProgress = async (score:number, progress:number, quizId:number, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    await fetchAPI("/(api)/quiz/update-progress", {
      method: "PUT",
      body: JSON.stringify({
        score: score,
        progress: progress, 
        quizId: quizId,
        clerkId: userClerkId
      }),
    });
    
    return { success: true }
  } catch(error) {
    console.error("Error saving progress to database")
    return { success: false }
  }

}

export const getUserName = async (userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    const fetchuser = await fetchAPI(`/(api)/quiz/${userClerkId}`, {
      method: "GET"
    })
    
    const allUser = fetchuser?.data
    console.log(allUser)
    return{
      allUser
    }
  } catch (error) {
  console.log(error)
  }
}