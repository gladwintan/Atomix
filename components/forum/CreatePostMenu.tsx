import { Image, View, Text, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../CustomButton";
import { icons } from "@/constants";
import { createPost } from "@/lib/forum";
import { useUser } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";

type CreatePostState = {
  error: boolean;
  message: string;
};

const topics = [
  { label: "Atomic Structure", value: "Atomic Structure" },
  { label: "Chemical Bonding", value: "Chemical Bonding" },
  { label: "Acid-Base Equilibrium", value: "Acid-Base Equilibrium" },
  { label: "Intro to Organic Chem", value: "Intro to Organic Chem" },
];

const difficulties = [
  { label: "H2 Chemistry", value: "H2 Chemistry" },
  { label: "H1 Chemistry", value: "H1 Chemistry" },
];

const CreatePostMenu = ({ onPostCreated }: { onPostCreated: () => void }) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [createPostState, setCreatePostState] =
    useState<CreatePostState | null>(null);
  const [openTopicMenu, setOpenTopicMenu] = useState(false);
  const [openDifficultyMenu, setOpenDifficultyMenu] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topic, setTopic] = useState("");

  const handleCreatePost = async () => {
    const { newPost, success, error } = await createPost(
      title.trim(),
      description.trim(),
      difficulty,
      topic,
      userClerkId
    );
    if (success) {
      onPostCreated();
      setCreatePostState({ error: false, message: success });
      setTimeout(() => setShowCreateMenu(false), 500);
    } else if (error) {
      setCreatePostState({ error: true, message: error });
    }
  };

  useEffect(() => {
    if (createPostState == null || createPostState.error) {
      return;
    }

    setTopic("");
    setDifficulty("");
    setDescription("");
    setTitle("");
    setCreatePostState(null);
    setOpenDifficultyMenu(false);
    setOpenTopicMenu(false);
  }, [showCreateMenu]);

  return (
    <>
      <CustomButton
        title="new post"
        type="transparent"
        textVariant="primary"
        textClassName="text-base-light"
        IconLeft={() => (
          <Image
            source={icons.add}
            tintColor="#364463"
            className="w-4 h-4 mr-1"
          />
        )}
        onPress={() => setShowCreateMenu(!showCreateMenu)}
      />
      {showCreateMenu && (
        <ReactNativeModal
          isVisible
          backdropOpacity={0.15}
          onBackdropPress={() => setShowCreateMenu(false)}
          className="m-0 justify-end"
          avoidKeyboard
        >
          <View className="h-5/6 bg-white w-full rounded-t-3xl p-4">
            <View className="flex-row justify-center items-center space-x-1">
              <Text className="font-openSans-semibold text-dark-base">
                New post
              </Text>
              <Image
                source={icons.post}
                tintColor="#161d2e"
                className="w-4 h-4"
              />
              <CustomButton
                title=""
                type="transparent"
                IconLeft={() => (
                  <Image
                    source={icons.close}
                    tintColor="#9ca3af"
                    className="w-5 h-5"
                  />
                )}
                onPress={() => setShowCreateMenu(false)}
                className="absolute right-0 bottom-0"
              />
            </View>

            <View className="flex-row justify-between my-5">
              {/* Topic picker */}
              <DropDownPicker
                open={openTopicMenu}
                value={topic}
                items={topics}
                setOpen={setOpenTopicMenu}
                onOpen={() => setOpenDifficultyMenu(false)}
                setValue={setTopic}
                placeholder="Select topic"
                containerStyle={{ width: "55%" }}
                style={{ borderColor: "#d1d5db" }}
                labelStyle={{
                  color: "#161d2e",
                  fontFamily: "openSans-medium",
                }}
                dropDownContainerStyle={{ borderColor: "#d1d5db" }}
                textStyle={{
                  color: "#161d2e",
                  fontFamily: "openSans",
                }}
              />

              {/* Difficulty picker */}
              <DropDownPicker
                open={openDifficultyMenu}
                value={difficulty}
                items={difficulties}
                setOpen={setOpenDifficultyMenu}
                onOpen={() => setOpenTopicMenu(false)}
                setValue={setDifficulty}
                placeholder="Select level"
                containerStyle={{ width: "40%" }}
                style={{ borderColor: "#d1d5db" }}
                labelStyle={{
                  color: "#161d2e",
                  fontFamily: "openSans-medium",
                }}
                dropDownContainerStyle={{
                  borderColor: "#d1d5db",
                }}
                textStyle={{
                  color: "#161d2e",
                }}
              />
            </View>
            <ScrollView className="h-full">
              {/* Post title */}
              <TextInput
                onChangeText={setTitle}
                value={title}
                className="font-openSans-semibold p-2 text-base text-dark-base border-b border-neutral-300"
                placeholder="Post title"
                placeholderTextColor="#6b7280"
                multiline
                textAlignVertical="top"
                scrollEnabled={false}
              />

              {/* Post description */}
              <TextInput
                onChangeText={setDescription}
                value={description}
                className="font-openSans p-2 text-dark-base mt-3"
                placeholder="Description..."
                placeholderTextColor="#6b7280"
                multiline
                textAlignVertical="top"
                scrollEnabled={false}
              />
            </ScrollView>

            {/* Post button and status message */}
            <View className="mb-2 mr-2">
              {createPostState && (
                <Text
                  className={`font-openSans-medium ${createPostState.error ? "text-red-400" : "text-green-dark"}`}
                >
                  {createPostState.message}
                </Text>
              )}
              <CustomButton
                title="Post"
                textVariant="white"
                onPress={handleCreatePost}
                className="self-end bg-secondary-500"
              />
            </View>
          </View>
        </ReactNativeModal>
      )}
    </>
  );
};

export default CreatePostMenu;
