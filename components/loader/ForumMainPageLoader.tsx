import { icons } from "@/constants";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, Image, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const ForumMainPageLoader = ({
  fetchError,
  fetchPosts,
}: {
  fetchError: string;
  fetchPosts: () => void;
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
        onPress={fetchPosts}
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
        {/* Quick Links */}
        <Rect
          x="20"
          y="20"
          rx="10"
          ry="10"
          width={(screenWidth - 40) / 3}
          height="50"
        />
        <Rect
          x={30 + (screenWidth - 40) / 3}
          y="20"
          rx="10"
          ry="10"
          width={(screenWidth - 40) / 3}
          height="50"
        />
        <Rect
          x={40 + ((screenWidth - 40) / 3) * 2}
          y="20"
          rx="10"
          ry="10"
          width={`${(screenWidth - 40) / 3}`}
          height="50"
        />

        {/* Trending section */}
        <Rect x="20" y="110" rx="10" ry="10" width="100" height="20" />
        <Rect
          x="20"
          y="150"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />

        {/* Discover section */}
        <Rect x="20" y="340" rx="10" ry="10" width="100" height="20" />
        <Rect
          x="20"
          y="380"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />
        <Rect
          x="20"
          y="550"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />
        <Rect
          x="20"
          y="720"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />
        <Rect
          x="20"
          y="890"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />
        <Rect
          x="20"
          y="1060"
          rx="10"
          ry="10"
          width={`${screenWidth - 40}`}
          height="150"
        />
      </ContentLoader>
    </View>
  );
};

export default ForumMainPageLoader;
