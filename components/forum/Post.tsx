import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  RefreshControl,
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createLikeForPost,
  deletePost,
  getLikeForPost,
  getPostDetailsWithReplies,
  removeLikeForPost,
  updatePost,
} from "@/lib/forum";
import { PostReply, ReplyDetails } from "@/types/type";
import {
  createRepliesWithNestLevel,
  formatPostTime,
  getPostTopicTagColour,
} from "@/lib/utils";
import CustomButton from "../CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import { graphics, icons } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import ReplyCard from "./ReplyCard";
import { router } from "expo-router";
import ReplyMenu from "./ReplyMenu";
import EditMenu from "./EditMenu";
import ForumPostLoader from "../loader/ForumPostLoader";
import EmptyState from "../EmptyState";

const Post = ({ postId }: { postId: string }) => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const textInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [likeButtonDisabled, setLikeButtonDisabled] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedPostDescription, setEditedPostDescription] = useState("");
  const [editState, setEditState] = useState({ loading: false, error: "" });

  const [showReplyMenu, setShowReplyMenu] = useState(false);
  const [replyDetails, setReplyDetails] = useState<ReplyDetails>({
    parentReplyId: null,
    author: "",
  });

  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postDifficulty, setPostDifficulty] = useState("");
  const [postTopic, setPostTopic] = useState("");
  const [postAuthor, setPostAuthor] = useState("");
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [postCreationDate, setPostCreationDate] = useState("");
  const [postLastUpdatedDate, setPostLastUpdatedDate] = useState("");
  const [postReplies, setPostReplies] = useState<PostReply[]>([]);
  const [postLiked, setPostLiked] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    fetchPostDetails();
  }, [postId, userClerkId]);

  const fetchPostDetails = useCallback(async () => {
    setLoading(true);
    const { postDetails, success, error } = await getPostDetailsWithReplies(
      postId,
      userClerkId
    );

    if (postDetails) {
      setIsAuthor(postDetails.user_is_author);
      setPostTitle(postDetails.title);
      setPostDescription(postDetails.description);
      setPostDifficulty(postDetails.difficulty);
      setPostTopic(postDetails.topic);
      setPostAuthor(postDetails.name);
      setPostLikeCount(parseInt(postDetails.like_count));
      setPostCreationDate(postDetails.created_at);
      setPostLastUpdatedDate(postDetails.last_updated);
      setPostReplies(createRepliesWithNestLevel(postDetails.replies));
      setPostLiked(postDetails.user_liked_post);
      setEditedPostDescription(postDetails.description);

      setTimeout(() => setLoading(false), 500);
    } else if (error || !postDetails) {
      setFetchError(true);
    }
  }, [postId, userClerkId]);

  useEffect(() => {
    if (isEditing) {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    }
  }, [isEditing]);

  const handleLikePost = async () => {
    setLikeButtonDisabled(true);
    if (!postLiked) {
      await createLikeForPost(postId, userClerkId);
      setPostLikeCount(postLikeCount + 1);
      setPostLiked(true);
      setLikeButtonDisabled(false);
    } else {
      await removeLikeForPost(postId, userClerkId);
      setPostLikeCount(postLikeCount - 1);
      setPostLiked(false);
      setLikeButtonDisabled(false);
    }
  };

  const handleEditPost = async () => {
    if (postDescription == editedPostDescription) {
      setIsEditing(false);
      return;
    }

    setEditState({ ...editState, loading: true });
    const state = await updatePost(
      editedPostDescription.trim(),
      postId,
      userClerkId
    );
    if (state.error) {
      setEditState({ loading: false, ...state });
    }

    if (state.success) {
      setPostDescription(editedPostDescription);
      setPostLastUpdatedDate(new Date().toISOString());
      setIsEditing(false);
      setEditState({ loading: false, error: "" });
    }
  };

  const handleDeletePost = () => {
    deletePost(postId, userClerkId);
    router.replace("/forum");
  };

  return loading ? (
    <ForumPostLoader fetchError={fetchError} />
  ) : (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={85}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fetchPostDetails}
            colors={["#9Bd35A", "#689F38"]}
            progressBackgroundColor="#ffffff"
          />
        }
        className="flex-1"
      >
        <View className="px-3.5 pb-3">
          {isAuthor && (
            <EditMenu
              handleEdit={handleEditPost}
              handleDelete={handleDeletePost}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              editState={editState}
            />
          )}

          <View className="flex-row items-center space-x-2.5 mb-2.5">
            <Text className="font-openSans-semibold text-xs bg-primary-700 text-white p-1 rounded-full">
              {postDifficulty}
            </Text>
            <Text
              className={`font-openSans-semibold text-xs text-white p-1 rounded-md ${getPostTopicTagColour(postTopic)}`}
            >
              {postTopic}
            </Text>
          </View>

          <View className="flex-row items-center mb-1.5">
            <Text
              numberOfLines={1}
              className="font-openSans text-dark-light text-xs max-w-[70vw]"
            >
              by {isAuthor ? "you" : postAuthor}
            </Text>
            <Text className="font-openSans mx-1.5 text-gray-500 text-xs">
              •
            </Text>
            <Text className="font-openSans text-gray-500 text-xs">
              {formatPostTime(postCreationDate)}
            </Text>
          </View>

          <Text className="font-openSans-medium text-dark-base text-base">
            {postTitle}
          </Text>

          {/* Post description */}
          <TextInput
            ref={textInputRef}
            editable={isEditing}
            value={isEditing ? editedPostDescription : postDescription}
            onChangeText={setEditedPostDescription}
            className="font-openSans mt-1.5 text-dark-base"
            placeholder="No description given"
            multiline
            textAlignVertical="top"
            autoFocus
            scrollEnabled={false}
          />

          <View className="flex-row items-end justify-between mr-2 mt-4">
            <Text className="font-openSans-light text-3xs">
              {postCreationDate != postLastUpdatedDate &&
                "edited " + formatPostTime(postLastUpdatedDate)}
            </Text>
            <View className="flex-row items-center justfy-center space-x-3">
              {/* Reply button */}
              <CustomButton
                title="Reply"
                textVariant="primary"
                textClassName="text-xs text-gray-600 ml-1"
                type="transparent"
                IconLeft={() => (
                  <Image
                    source={icons.reply}
                    tintColor="#4b5563"
                    className="w-4 h-4"
                  />
                )}
                onPress={() => {
                  setReplyDetails({ parentReplyId: null, author: postAuthor });
                  setShowReplyMenu(true);
                }}
              />

              {/* Like button */}
              <CustomButton
                title={postLikeCount.toString()}
                onPress={() => !likeButtonDisabled && handleLikePost()}
                type="transparent"
                textVariant="primary"
                textClassName="text-gray-600 text-xs ml-1"
                IconLeft={() =>
                  postLiked ? (
                    <MaterialIcons name="favorite" color="#ff4f8a" size={18} />
                  ) : (
                    <MaterialIcons
                      name="favorite-border"
                      color="#6b7280"
                      size={18}
                    />
                  )
                }
              />
            </View>
          </View>
        </View>

        {/* Replies */}
        <FlatList
          data={postReplies}
          renderItem={({ item }) => (
            <ReplyCard
              replyId={item.replyId}
              parentReplyId={item.parentReplyId}
              postId={item.postId}
              content={item.content}
              author={item.author}
              isAuthor={item.isAuthor}
              creationDate={item.creationDate}
              lastUpdatedDate={item.lastUpdatedDate}
              likeCount={item.likeCount}
              replyCount={item.replyCount}
              userLiked={item.userLiked}
              nestLevel={item.nestLevel}
              postReplies={postReplies}
              setPostReplies={setPostReplies}
              setReplyDetails={setReplyDetails}
              setShowReplyMenu={setShowReplyMenu}
            />
          )}
          keyExtractor={(item, index) => item.replyId}
          className="pb-4 bg-white"
          scrollEnabled={false}
          ListEmptyComponent={() => (
            <EmptyState
              title="No replies yet"
              description="Start a discussion by replying to the post"
              imageSrc={graphics.repliesEmpty}
              containerClassName="border-t border-neutral-200 pt-10"
            />
          )}
        />
      </ScrollView>

      {showReplyMenu && (
        <ReplyMenu
          postId={postId}
          parentReplyId={replyDetails.parentReplyId}
          author={replyDetails.author}
          postReplies={postReplies}
          setPostReplies={setPostReplies}
          setShowReplyMenu={setShowReplyMenu}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Post;
