import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions, View } from "react-native";

const CourseLoader = () => {
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  return (
    <View>
      <ContentLoader
        speed={2}
        width={screenWidth}
        height={screenHeight}
        viewBox={`0 0 ${screenWidth} ${screenHeight}`}
        backgroundColor="#f4f8ff"
        foregroundColor="#e9f0ff"
      >
        <Rect x="20" y="0" rx="10" ry="10" width="80" height="20" />
        <Rect x="110" y="0" rx="10" ry="10" width="80" height="20" />
        <Rect x={`${screenWidth - 80}`} y="5" rx="7" ry="7" width="60" height="15" />
        <Rect x="20" y="40" rx="10" ry="10" width="275" height="100" />

        <Rect x="20" y="190" rx="10" ry="10" width="80" height="20" />
        <Rect x={`${screenWidth - 80}`} y="195" rx="7" ry="7" width="60" height="15" />
        <Rect x="20" y="230" rx="10" ry="10" width={`${screenWidth - 40}`} height="80" />
        <Rect x="20" y="320" rx="10" ry="10" width={`${screenWidth - 40}`} height="80" />
        <Rect x="20" y="410" rx="10" ry="10" width={`${screenWidth - 40}`} height="80" />
        <Rect x="20" y="500" rx="10" ry="10" width={`${screenWidth - 40}`} height="80" />
        <Rect x="20" y="590" rx="10" ry="10" width={`${screenWidth - 40}`} height="80" />
      </ContentLoader>
    </View>
  );
};

export default CourseLoader;
