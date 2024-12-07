import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ReactNativeModal from "react-native-modal";
import { createReply } from "@/lib/forum";
import { useUser } from "@clerk/clerk-expo";
import { PostReply } from "@/types/type";
import CustomButton from "../CustomButton";
import { icons } from "@/constants";
import { appendNewReply } from "@/lib/utils";

const ReplyMenu = ({
  postId,
  parentReplyId,
  author,
  postReplies,
  setPostReplies,
  setShowReplyMenu,
}: {
  postId: string;
  parentReplyId: string | null;
  author: string;
  postReplies: PostReply[];
  setPostReplies: React.Dispatch<React.SetStateAction<PostReply[]>>;
  setShowReplyMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [replyContent, setReplyContent] = useState("");

  const handleReply = async () => {
    const { newReply, error, success } = await createReply(
      replyContent.trim(),
      postId,
      parentReplyId,
      userClerkId
    );
    if (success) {
      setShowReplyMenu(false);
      setReplyContent("");
      setPostReplies(appendNewReply(postReplies, newReply));
    }
  };

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    textInputRef.current?.focus();
  }, [parentReplyId]);

  return (
    <TouchableWithoutFeedback className="bg-white shadow-lg">
      <View className="p-4 bg-white w-[100vw]">
        <View className="flex-row justify-between items-center">
          <Text className="font-openSans text-gray-500 mb-2 text-xs">
            Reply to {author}
          </Text>
          <CustomButton
            type="transparent"
            IconLeft={() => (
              <Image
                source={icons.close}
                tintColor="#6b7280"
                className="w-4 h-4"
              />
            )}
            onPress={() => setShowReplyMenu(false)}
          />
        </View>
        <TextInput
          ref={textInputRef}
          value={replyContent}
          onChangeText={setReplyContent}
          className="font-openSans text-dark-base mb-4 max-h-[100px]"
          placeholder="Enter your reply here"
          multiline
          textAlignVertical="top"
          autoFocus
        />
        <CustomButton
          title="send reply"
          type="confirm"
          textVariant="white"
          className="self-end"
          onPress={handleReply}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReplyMenu;
