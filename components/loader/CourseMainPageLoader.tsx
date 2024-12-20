import { icons } from "@/constants";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const CourseMainPageLoader = ({
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
      >
        {/* Ongoing courses section */}
        <Rect x="20" y="0" rx="15" ry="15" width="90" height="30" />
        <Rect x="130" y="0" rx="15" ry="15" width="90" height="30" />
        <Rect x="20" y="50" rx="10" ry="10" width="290" height="110" />
        <Rect x="330" y="50" rx="10" ry="10" width="290" height="110" />

        {/* Explore courses section */}
        <Rect x="20" y="210" rx="10" ry="10" width="85" height="30" />
        <Rect
          x="20"
          y="255"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="375"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="495"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="615"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="735"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
      </ContentLoader>
    </View>
  );
};

export default CourseMainPageLoader;
