import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo'

import { getQuizByCompletionStatus, getUserName } from '@/lib/quiz'
import { OngoingQuiz } from '@/types/type'
import { userName } from '@/types/type'

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

interface Avatar {
  URL: string;
}

const leaderboard = () => {
  const { user } = useUser()
  const userClerkId = user?.id  

  const [data, setData] = useState<Avatar[]>([])

  useEffect(() => {
    const fetchData = async() => {
      try{
        const queryavatar = await getDocs(collection(db, "users"));
        const avatar:Avatar[] = queryavatar.docs.map(doc => doc.data() as Avatar);
        setData(avatar);
      } catch (error) {
        console.log("Error fetching avatar: ", error)
      }
    };
    fetchData(
    )
  },[]);

  const [loading, setLoading] = useState(true)
  const [completedQuiz, setCompletedQuiz] = useState<OngoingQuiz[] | null>(null)
  const [ userNames,  setUserNames] = useState<userName[] | null >(null)

  useEffect(() => {
    if (userClerkId) {
      const fetchQuiz= async () => {
        const fetchData = await getQuizByCompletionStatus(userClerkId)
        setCompletedQuiz(fetchData?.completedQuiz)
        setLoading(false)
      }
      fetchQuiz()
    }
  }, [userClerkId])

  useEffect(() => {
    if (userClerkId) {
      const fetchUser= async () => {
        const fetchData = await getUserName(userClerkId)
        setUserNames(fetchData?.allUser)
      }
      fetchUser()
    }
  }, [userClerkId])
  console.log("userName", userNames)
  return (
    <View>
      {data.map((item, index) => (
      <Text>{item.URL}</Text>
      ))}
      
    </View>
  )
}

export default leaderboard