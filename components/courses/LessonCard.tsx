import { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import ReactNativeModal from "react-native-modal";

import { icons } from "@/constants";
import { LessonCardProps } from "@/types/type";

const LessonCard = ({
  id,
  title,
  description,
  time,
  difficulty,
  lessonsCompleted,
  lastLesson,
  onPress,
}: LessonCardProps) => {
  const [showRestartMenu, setShowRestartMenu] = useState(false);

  return (
    <View className="pb-8">
      <View className="my-3">
        <View className="flex-row">
          <View className="mr-4 w-[30px] h-[30px] items-center justify-center rounded-full border-primary-700 border">
            <Text className="text-dark-light text-sm font-openSans-light">{id}</Text>
          </View>
          <View
            className={`w-10/12 p-2.5 relative bottom-2 ${id == lessonsCompleted + 1 && "bg-primary-50/40 rounded-lg"}`}
          >
            <Text className="text-sm text-dark-base font-openSans">{title}</Text>
            <Text className="mt-2.5 text-[13px] font-openSans-light text-dark-base leading-5">
              {description}
            </Text>

            <View className="mt-4 flex-row items-center justify-between">
              <View className="flex-row items-center space-x-1.5">
                <Text className="text-xs text-gray-500 font-openSans">
                  Difficulty {difficulty}
                </Text>
                <Text className="text-gray-500">•</Text>

                <View className="flex-row items-center">
                  <Image
                    source={icons.time}
                    tintColor="#6b7280"
                    resizeMode="contain"
                    className="w-4 h-4"
                  />
                  <Text className="ml-1 text-xs text-gray-500 font-openSans">
                    {time}
                  </Text>
                </View>
              </View>

              {lessonsCompleted != -1 && id <= lessonsCompleted ? (
                <TouchableOpacity
                  onPress={() => setShowRestartMenu(true)}
                  className="bg-[#E8F8EB]/80 p-1 px-2 rounded-md flex-row items-center justify-center relative"
                >
                  <Text className="text-[#36633e] text-xs font-openSans-medium">
                    Completed
                  </Text>
                  <Image
                    source={icons.check}
                    tintColor="#36633e"
                    resizeMode="contain"
                    className="ml-1 w-4 h-4"
                  />
                </TouchableOpacity>
              ) : id == lessonsCompleted + 1 ? (
                <TouchableOpacity
                  onPress={onPress}
                  className="bg-[#91B0F2] p-1 px-2 rounded-md flex-row items-center justify-center relative"
                >
                  <Text className="text-white text-xs font-openSans-semibold">
                    Start lesson
                  </Text>
                  <Image
                    source={icons.start}
                    tintColor="white"
                    resizeMode="contain"
                    className="ml-1 w-4 h-4"
                  />
                </TouchableOpacity>
              ) : (
                <View className="bg-[#91B0F2]/75 p-1 px-2 rounded-md flex-row items-center justify-center relative">
                  <Text className="text-white text-xs font-openSans-medium">Locked</Text>
                  <Image
                    source={icons.lock}
                    tintColor="white"
                    resizeMode="contain"
                    className="ml-1 w-4 h-4"
                  />
                </View>
              )}
            </View>
          </View>

          {showRestartMenu && (
            <ReactNativeModal isVisible={showRestartMenu}>
              <View className="rounded-2xl p-4 h-[250px] w-[300px] self-center bg-white space-y-5 items-center justify-center">
                <Image
                  source={icons.completedEmpty}
                  className="w-[160px] h-[64px]"
                  resizeMode="contain"
                />
                <Text className="text-center text-[#161d2e] text-sm mb-3 font-medium px-2">
                  You have already completed this lesson
                </Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={() => setShowRestartMenu(false)}
                    className="w-28 items-center justify-center border border-slate-300 p-2 rounded-lg"
                  >
                    <Text className="text-[#161d2e]">Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setShowRestartMenu(false);
                      onPress();
                    }}
                    className="w-28 bg-[#91B0F2] items-center justify-center p-2 rounded-lg"
                  >
                    <Text className="text-white font-semibold">
                      Start lesson
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ReactNativeModal>
          )}
        </View>
      </View>

      {!lastLesson && (
        <View
          className={`${id <= lessonsCompleted ? "border-[#B3CCFF]" : "border-slate-300"} 
            absolute bottom-6 ml-3 h-16 w-0 border-2 rounded-b-full rounded-t-full`}
        />
      )}
    </View>
  );
};

export default LessonCard;
