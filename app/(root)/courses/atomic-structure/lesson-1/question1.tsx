import { SafeAreaView } from 'react-native'

import BinaryQuestion from '@/components/questions/BinaryQuestionCard'

import { images } from '@/courses/AtomicStructure'

const Question1 = () => {

  return (
    <SafeAreaView className='h-full bg-white'>
      <BinaryQuestion
        nextPageUrl='/(root)/courses/atomic-structure/lesson-1/question2'
        imageSrc={images.dOrbitals}
        question='The above is correct'
        answer={true}
      />
    </SafeAreaView>
  )
}

export default Question1