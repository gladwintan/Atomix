import { icons } from "@/constants";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const CourseLoader = ({
  fetchError,
  fetchCourses,
}: {
  fetchError: string;
  fetchCourses: () => void;
}) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return fetchError ? (
    <View className="justify-center items-center h-1/2 space-y-4">
      <Image source={icons.error} />
      <Text className="font-openSans text-base text-dark-lighter">
        {fetchError}
      </Text>
      <CustomButton
        title="Reload"
        type="outline"
        className="px-3"
        onPress={fetchCourses}
      />
    </View>
  ) : (
    <View>
      <ContentLoader
        speed={2}
        width={screenWidth}
        height={screenHeight}
        viewBox={`0 0 ${screenWidth} ${screenHeight}`}
        backgroundColor="#f4f8ff"
        foregroundColor="#e9f0ff"
      >
        {/* Ongoing courses section */}
        <Rect x="20" y="0" rx="10" ry="10" width="80" height="20" />
        <Rect x="110" y="0" rx="10" ry="10" width="80" height="20" />
        <Rect x="20" y="40" rx="10" ry="10" width="275" height="100" />

        {/* Explore courses section */}
        <Rect x="20" y="190" rx="10" ry="10" width="80" height="20" />
        <Rect
          x="20"
          y="230"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="320"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="410"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="500"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="590"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
      </ContentLoader>
    </View>
  );
};

export default CourseLoader;
