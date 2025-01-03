import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { formatPostTime } from "@/lib/utils";
import { getPostLevelTagColour, getPostTopicTagColour } from "@/lib/forumUtils";

const ForumPostCard = ({
  postId,
  likeCount,
  replyCount,
  title,
  description,
  level,
  topic,
  author,
  isAuthor,
  userLikedPost,
  userRepliedPost,
  creationDate,
}: {
  postId: string;
  likeCount: string;
  replyCount: string;
  title: string;
  description: string;
  level: string;
  topic: string;
  author: string;
  isAuthor: boolean;
  userLikedPost: boolean;
  userRepliedPost: boolean | undefined;
  creationDate: string;
}) => {
  return (
    <TouchableOpacity
      className="p-4 w-[100vw]"
      onPress={() => router.push(`/(root)/forum/${postId}` as Href)}
    >
      <View className="flex-row items-center space-x-2.5 mb-2.5">
        <Text
          className={`font-openSans-semibold text-xs text-white px-1 py-0.5 rounded-full ${getPostLevelTagColour(level)}`}
        >
          {level}
        </Text>
        <Text
          className={`font-openSans-semibold text-xs text-white px-1 py-0.5 rounded-md ${getPostTopicTagColour(topic)}`}
        >
          {topic}
        </Text>
      </View>

      <View className="flex-row items-center space-x-2.5">
        <Text className="font-openSans text-dark-light text-xs max-w-[55vw]">
          by {isAuthor ? "you" : author}
        </Text>
        <View className="flex-row items-center space-x-1">
          <Image
            source={icons.time}
            tintColor="#6b7280"
            className="h-3.5 w-3.5"
          />
          <Text className="text-gray-500 text-xs">
            posted {formatPostTime(creationDate)} ago
          </Text>
        </View>
      </View>

      <Text className="font-openSans-medium text-[15px] text-dark-base mt-1.5">
        {title}
      </Text>

      <Text numberOfLines={2} className="font-openSans text-dark-lighter mt-1">
        {description}
      </Text>

      <View className="flex-row items-center space-x-3 mt-2.5 justify-end">
        <View className="flex-row items-center">
          <Image
            source={userRepliedPost ? icons.commentReplied : icons.comment}
            tintColor="#6b7280"
            className="w-4 h-4"
          />
          <Text className="ml-1 font-openSans text-gray-600">{replyCount}</Text>
        </View>
        <View className="flex-row items-center">
          {userLikedPost ? (
            <MaterialIcons name="favorite" color="#ff4f8a" size={18} />
          ) : (
            <MaterialIcons name="favorite-border" color="#6b7280" size={18} />
          )}
          <Text className="ml-1 font-openSans text-gray-600">{likeCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ForumPostCard;
