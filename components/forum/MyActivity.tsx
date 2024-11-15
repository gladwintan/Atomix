import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../CustomButton'
import { icons } from '@/constants'
import CreatePostMenu from './CreatePostMenu'
import { useUser } from '@clerk/clerk-expo'
import { getPosts } from '@/lib/forum'
import { Post } from '@/types/type'
import ForumPostCard from './ForumPostCard'

const MyActivity = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [showCreateMenu, setShowCreateMenu] = useState(false)
  const [myPosts, setMyPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const posts = await getPosts(userClerkId)
      setMyPosts(posts)
      console.log(posts)
    }
    if (userClerkId) fetchData()
  }, [userClerkId, showCreateMenu])

  return (
    <View>
      <FlatList
        data={myPosts}
        renderItem={({ item }) => (
          <ForumPostCard
            postId={item.id}
            question={item.title}
            likes={item.likes}
            posts={myPosts}
            setPosts={setMyPosts}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        className="py-2 bg-white"
      />
        
      <Text>MyActivity</Text>
      <CustomButton
        title="create"
        IconRight={() => <Image source={icons.add} className='w-4 h-4' />}
        onPress={() => setShowCreateMenu(!showCreateMenu)}
      />
      {showCreateMenu &&
        <CreatePostMenu 
          setShowCreateMenu={setShowCreateMenu}
        />
      }
    </View>
  )
}

export default MyActivity