import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList,NativeSyntheticEvent, NativeScrollEvent, Dimensions} from 'react-native'
import React from 'react'
import Animated, { useSharedValue, withSpring, runOnJS, useAnimatedStyle } from 'react-native-reanimated'
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from 'react-native-gesture-handler'
import { OngoingQuiz } from '@/types/type'
import { useRef, useState } from 'react'
import CarouselCard from './CarouselCard'

const { width } = Dimensions.get('window')

const CarouselList = ({OngoingQuiz}:{OngoingQuiz:OngoingQuiz[]}) => {
  
  const [currentPosition, SetcurrentPosition] = useState<number>(0)
  const translateX = useSharedValue(0)
  const gestureState = useSharedValue(State.UNDETERMINED)
  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    translateX.value = event.nativeEvent.translationX
  }

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const newIndex = Math.round(translateX.value / width) * -1;  // Calculate new index
      translateX.value = withSpring(newIndex * width);  // Smoothly move to the new index
      runOnJS(SetcurrentPosition)(Math.max(0, Math.min(OngoingQuiz.length - 1, newIndex)));  // Clamp and update the current index
    }
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(translateX.value),  // Smooth spring animation
        },
      ],
    };
  });

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity>
          <Image source={require('@/assets/icons/chevron-left.png')}/>
        </TouchableOpacity>
      </View>

      <View>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
            {OngoingQuiz != null 
            ? <Animated.View style={[animatedStyles]}>
              {OngoingQuiz.map ((item: OngoingQuiz) => (<View style={[{width}]}>
                <Text>{item.quiz_topic}</Text>
              </View> 
              ))}
            </Animated.View> 
            : <Text>No Quiz Started</Text>
            }
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>

      <View>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('@/assets/icons/chevron-right.png')}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CarouselList