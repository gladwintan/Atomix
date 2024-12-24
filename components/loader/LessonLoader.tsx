import { icons } from "@/constants";
import { Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import { ActivityIndicator } from "react-native-paper";

const LessonLoader = ({
  loading,
  fetchError,
  onFetchError,
}: {
  loading: boolean;
  fetchError: string;
  onFetchError: () => void;
}) => {
  return (
    <View
      className={`absolute w-screen h-screen bg-white items-center justify-center z-50 ${!loading && "hidden"}`}
    >
      {fetchError ? (
        <View className="justify-center items-center h-1/2 space-y-4">
          <Image source={icons.error} />
          <Text className="font-openSans text-sm text-dark-lighter">
            {fetchError}
          </Text>
          <CustomButton
            title="Back to course page"
            type="outline"
            className="px-3"
            onPress={onFetchError}
          />
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          theme={{ colors: { primary: "#8FABE5" } }}
        />
      )}
    </View>
  );
};

export default LessonLoader;
