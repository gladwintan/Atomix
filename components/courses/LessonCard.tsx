import { useState } from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";
import ReactNativeModal from "react-native-modal";
import * as Progress from "react-native-progress";

import { graphics, icons } from "@/constants";
import { LessonWithProgress } from "@/types/type";
import { router } from "expo-router";
import { startLesson } from "@/lib/courses";
import { useUser } from "@clerk/clerk-expo";
import { formatDate } from "@/lib/utils";
import CustomButton from "../CustomButton";

const LessonCard = ({
  id,
  courseId,
  title,
  description,
  time,
  difficulty,
  lessonSequence,
  lessonsCompleted,
  lastLesson,
  status,
  progress,
  lastCompletedAt,
}: Omit<LessonWithProgress, "contents"> & {
  courseId: string;
  lessonSequence: number;
  lessonsCompleted: number;
  lastLesson: boolean;
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [showRestartMenu, setShowRestartMenu] = useState(false);

  const handleStartLesson = () => {
    router.replace(
      `/(root)/courses/lesson?courseId=${courseId}&lesson=${lessonSequence - 1}&progress=${status == "completed" ? "0.0" : progress}`
    );
    startLesson(courseId, id.toString(), userClerkId);
  };

  return (
    <View className="mb-8">
      <View className="my-3">
        <View className="flex-row">
          <View
            className={`mr-3 w-[35px] h-[35px] items-center justify-center`}
          >
            <Progress.Circle
              progress={progress}
              thickness={3}
              borderWidth={0}
              unfilledColor="#f3f4f6"
              color={status != "uncompleted" ? "#3fa650" : "none"}
              strokeCap="round"
            />
            <Text className="absolute text-dark-light text-sm font-openSans-semibold">
              {lessonSequence}
            </Text>
          </View>

          <View
            className={`w-10/12 p-2.5 relative bottom-2 ${lessonSequence == lessonsCompleted + 1 && "bg-primary-50/70 rounded-lg"}`}
          >
            <Text className="text-sm text-dark-base font-openSans-medium">
              {title}
            </Text>
            <Text className="mt-2 text-[13px] font-openSans text-dark-light">
              {description}
            </Text>

            <View className="mt-3.5 flex-row items-center justify-between">
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
                    className="w-3.5 h-3.5"
                  />
                  <Text className="ml-1 text-xs text-gray-500 font-openSans">
                    {time}
                  </Text>
                </View>
              </View>

              {/* Render buttons based on completion status of lesson */}
              {status == "completed" ? (
                // Completed button to show restart lesson menu
                <CustomButton
                  title="completed"
                  textClassName="text-[#36633e]"
                  className="bg-[#E8F8EB]/80 shadow-none p-1 px-2 rounded-md"
                  IconRight={() => (
                    <Image
                      source={icons.check}
                      tintColor="#36633e"
                      resizeMode="contain"
                      className="ml-1 w-4 h-4"
                    />
                  )}
                  onPress={() => setShowRestartMenu(true)}
                />
              ) : status == "ongoing" ? (
                // Resume button to continue lesson with saved progress
                <CustomButton
                  title="resume"
                  textVariant="secondary"
                  className="p-1 px-2 rounded-md shadow-none"
                  IconRight={() => (
                    <Image
                      source={icons.resume}
                      tintColor="white"
                      resizeMode="contain"
                      className="ml-1 w-4 h-4"
                    />
                  )}
                  onPress={handleStartLesson}
                />
              ) : lessonSequence == lessonsCompleted + 1 ? (
                // Start button to start lesson and create progress
                <CustomButton
                  title="Start lesson"
                  textVariant="secondary"
                  className="p-1 px-2 rounded-md shadow-none"
                  IconRight={() => (
                    <Image
                      source={icons.resume}
                      tintColor="white"
                      resizeMode="contain"
                      className="ml-1 w-4 h-4"
                    />
                  )}
                  onPress={handleStartLesson}
                />
              ) : (
                <View className="bg-[#91B0F2]/75 p-1 px-2 rounded-md flex-row items-center justify-center">
                  <Text className="text-white text-xs font-openSans-semibold">
                    Locked
                  </Text>
                  <Image
                    source={icons.lock}
                    tintColor="white"
                    resizeMode="contain"
                    className="ml-1 w-4 h-4"
                  />
                </View>
              )}
            </View>

            {lastCompletedAt && (
              <Text className="absolute text-3xs -bottom-4 right-2 text-dark-light font-openSans">
                Last completed on {formatDate(lastCompletedAt)}
              </Text>
            )}
          </View>

          {showRestartMenu && (
            // Restart lesson menu
            <ReactNativeModal
              isVisible={showRestartMenu}
              onBackdropPress={() => setShowRestartMenu(false)}
            >
              <View className="rounded-2xl p-4 h-[250px] w-[300px] self-center bg-white space-y-5 items-center justify-center">
                <Image
                  source={graphics.completedCoursesEmpty}
                  className="w-[160px] h-[64px]"
                  resizeMode="contain"
                />
                <Text className="text-center text-dark-base font-openSans text-sm mb-3 px-2">
                  You have already completed this lesson
                </Text>
                <View className="flex-row space-x-2">
                  <TouchableOpacity
                    onPress={() => setShowRestartMenu(false)}
                    className="w-28 items-center justify-center border border-slate-300 p-2 rounded-lg"
                  >
                    <Text className="font-openSans text-dark-base text-xs">
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleStartLesson}
                    className="w-28 bg-primary-500 items-center justify-center p-2 rounded-lg"
                  >
                    <Text className="text-white font-openSans-bold text-xs">
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
          className={`${lessonSequence <= lessonsCompleted ? "bg-[#3fa650]" : "bg-gray-200"} 
            absolute -bottom-2 ml-4 h-14 w-1 rounded-b-full rounded-t-full`}
        />
      )}
    </View>
  );
};

export default LessonCard;
