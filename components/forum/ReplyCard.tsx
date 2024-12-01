import {
  View,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PostReply, ReplyDetails } from "@/types/type";
import { formatPostTime, removeReplyTree } from "@/lib/utils";
import CustomButton from "../CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { icons } from "@/constants";
import {
  createLikeForReply,
  deleteReply,
  getLikeForReply,
  removeLikeForReply,
  updateReply,
} from "@/lib/forum";
import { useUser } from "@clerk/clerk-expo";
import ReplyMenu from "./ReplyMenu";
import EditMenu from "./EditMenu";

const ReplyCard = ({
  replyId,
  parentReplyId,
  postId,
  content,
  creationDate,
  lastUpdatedDate,
  author,
  isAuthor,
  likeCount,
  replyCount,
  userLiked,
  nestLevel,
  postReplies,
  setPostReplies,
  setReplyDetails,
  setShowReplyMenu,
}: PostReply & {
  postReplies: PostReply[];
  setPostReplies: React.Dispatch<React.SetStateAction<PostReply[]>>;
  setReplyDetails: React.Dispatch<React.SetStateAction<ReplyDetails>>;
  setShowReplyMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [loading, setLoading] = useState(true);
  const [replyLikeCount, setReplyLikeCount] = useState(likeCount);
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);
  const [replyLiked, setReplyLiked] = useState(userLiked);
  const [replyContent, setReplyContent] = useState(content);
  const [editedReplyContent, setEditedReplyContent] = useState(content);
  const [replyLastUpdatedDate, setReplyLastUpdatedDate] =
    useState(lastUpdatedDate);

  const [isEditing, setIsEditing] = useState(false);
  const [editState, setEditState] = useState({ loading: false, error: "" });

  const handleLikeReply = async () => {
    setLikeButtonDisabled(true);
    if (!replyLiked) {
      await createLikeForReply(replyId, userClerkId);
      setReplyLikeCount(replyLikeCount + 1);
      setReplyLiked(true);
      setLikeButtonDisabled(false);
    } else {
      await removeLikeForReply(replyId, userClerkId);
      setReplyLikeCount(replyLikeCount - 1);
      setReplyLiked(false);
      setLikeButtonDisabled(false);
    }
  };

  const handleEditReply = async () => {
    if (editedReplyContent != replyContent) {
      setEditState({ ...editState, loading: true });
      const state = await updateReply(editedReplyContent, replyId, userClerkId);
      if (state.error) {
        setEditState({ loading: false, ...state });
      }

      if (state.success) {
        setReplyContent(editedReplyContent);
        setReplyLastUpdatedDate(new Date().toISOString());
        setIsEditing(false);
        setEditState({ loading: false, error: "" });
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleDeleteReply = () => {
    deleteReply(replyId, userClerkId);
    setPostReplies(removeReplyTree(postReplies, replyId));
  };

  return (
    <View
      className={`px-3.5 py-3 ${nestLevel == 0 && "border-t-[3px] border-neutral-100"}`}
      style={{ marginLeft: 15 * nestLevel }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2">
          <View className="bg-primary-100 rounded-full w-5 h-5 items-center justify-center">
            <Text className="font-openSans text-3xs">{author.slice(0, 1)}</Text>
          </View>
          <View className="flex-row space-x-1">
            <Text
              numberOfLines={1}
              className="font-openSans text-dark-light text-xs max-w-[50vw]"
            >
              {isAuthor ? "you" : author}
            </Text>
            <Text className="font-openSans text-gray-600 text-xs">•</Text>
            <Text className="font-openSans text-gray-600 text-xs">
              {formatPostTime(creationDate)}
            </Text>
          </View>
        </View>

        {isAuthor && (
          <EditMenu
            handleEdit={handleEditReply}
            handleDelete={handleDeleteReply}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editState={editState}
          />
        )}
      </View>

      <TextInput
        editable={isEditing}
        value={isEditing ? editedReplyContent : replyContent}
        onChangeText={setEditedReplyContent}
        className="font-openSans mt-1 text-dark-base"
        multiline
        textAlignVertical="top"
        scrollEnabled={false}
      />

      <View className="flex-row items-end justify-between mr-2 mt-2">
        <Text className="font-openSans-light text-3xs">
          {creationDate != replyLastUpdatedDate &&
            "edited " + formatPostTime(replyLastUpdatedDate)}
        </Text>

        <View className="flex-row items-center justify-center space-x-2.5">
          {/* Reply button */}
          <CustomButton
            title=""
            type="transparent"
            IconLeft={() => (
              <Image
                source={icons.reply}
                tintColor="#4b5563"
                className="w-4 h-4"
              />
            )}
            onPress={() => {
              setReplyDetails({ parentReplyId: replyId, author: author });
              setShowReplyMenu(true);
            }}
          />

          {/* Like button */}
          <CustomButton
            title={replyLikeCount.toString()}
            onPress={() => !likeButtonDisabled && handleLikeReply()}
            type="transparent"
            textVariant="primary"
            textClassName="text-gray-600 text-2xs ml-1"
            IconLeft={() =>
              replyLiked ? (
                <MaterialIcons name="favorite" color="#ff4f8a" size={17} />
              ) : (
                <MaterialIcons
                  name="favorite-border"
                  color="#6b7280"
                  size={17}
                />
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ReplyCard;
