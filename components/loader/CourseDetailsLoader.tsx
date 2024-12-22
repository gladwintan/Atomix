import { icons } from "@/constants";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const CourseDetailsLoader = ({
  fetchError,
  fetchDetails,
}: {
  fetchError: string;
  fetchDetails: () => void;
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
        onPress={fetchDetails}
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
        <Rect
          x="20"
          y="20"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="140"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="260"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="380"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="500"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="620"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
        <Rect
          x="20"
          y="740"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="100"
        />
      </ContentLoader>
    </View>
  );
};

export default CourseDetailsLoader;
