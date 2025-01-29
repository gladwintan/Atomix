import { icons } from "@/constants";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, Text, View } from "react-native";

const ForumPostLoader = ({ fetchError }: { fetchError: boolean }) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return fetchError ? (
    <View className="justify-center items-center h-1/2">
      <Image source={icons.error} />
      <Text className="font-openSans text-base text-dark-lighter mt-3">
        Something went wrong
      </Text>
    </View>
  ) : (
    <View>
      <ContentLoader
        speed={2}
        width={screenWidth}
        height={screenHeight}
        viewBox={`0 0 ${screenWidth} ${screenHeight}`}
      >
        <Rect x="20" y="0" rx="10" ry="10" width="100" height="20" />
        <Rect x="130" y="0" rx="5" ry="5" width="100" height="20" />
        <Rect
          x="20"
          y="40"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />

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
          y="330"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="430"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="530"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="630"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
        <Rect
          x="20"
          y="730"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="80"
        />
      </ContentLoader>
    </View>
  );
};

export default ForumPostLoader;
