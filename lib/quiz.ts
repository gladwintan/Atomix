import { ExploreQuizType, OngoingQuiz } from "@/types/type";
import { fetchAPI } from "./fetch";

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
    
    const ongoingQuiz = startedQuiz.filter((quiz: OngoingQuiz) => !(parseFloat(quiz.progress) == 1.0))
    const completedQuiz = startedQuiz.filter((quiz: OngoingQuiz) => (parseFloat(quiz.progress) == 1.0))

    const ongoingQuizNames = ongoingQuiz.map((quiz: OngoingQuiz) => quiz.quiz_topic)
    const completedQuizNames = completedQuiz.map((quiz: OngoingQuiz) => quiz.quiz_topic)

    const exploreQuiz = allQuiz?.map((quiz: ExploreQuizType) => {
      if (ongoingQuizNames.includes(quiz.quiz_topic)) {
        return { ...quiz, completionStatus: "ongoing" }
      } else if (completedQuizNames.includes(quiz.quiz_topic)) {
        return { ...quiz, completionStatus: "completed" }
      }
      return { ...quiz, completionStatus: "uncompleted" }
    })

    return {
      completedQuiz: completedQuiz.length == 0 ? null : completedQuiz,
      ongoingQuiz: ongoingQuiz.length == 0 ? null : ongoingQuiz,
      exploreQuiz: exploreQuiz
    }
  } catch (error) {
    console.error(error)
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
  return ongoingQuiz?.filter((quiz: OngoingQuiz) => !(parseFloat(quiz.progress) == 1.0))
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

export const startNewQuiz = async (quizTopic : string, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    await fetchAPI("/(api)/quiz/start", {
      method: "POST",
      body: JSON.stringify({
        quizTopic: quizTopic,
        clerkId: userClerkId,
      }),
    });
    
    return { success: true }
  } catch(error) {
    console.error("Error adding new quiz to database")
    return { success: false }
  }
}
export const updateQuizProgress = async (totalquestion: number, score:number, userClerkId: string | undefined) => {
  if (!userClerkId) {
    console.error("User not authenticated")
    return;
  }

  try {
    await fetchAPI("/(api)/quiz/update-progress", {
      method: "PUT",
      body: JSON.stringify({
        totalquestion: totalquestion,
        score: score,
        clerkId: userClerkId,
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