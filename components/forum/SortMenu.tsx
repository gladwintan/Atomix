import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/type";
import { icons } from "@/constants";
import CustomButton from "../CustomButton";
import { sortPosts } from "@/lib/forum";

const sortOptions = [
  { label: "Recent", value: "Recent" },
  { label: "Likes", value: "Likes" },
  { label: "Replies", value: "Replies" },
];

const SortMenu = ({
  posts,
  setPosts,
}: {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const [sortOption, setSortOption] = useState("");
  const [openSortMenu, setOpenSortMenu] = useState(false);

  useEffect(() => {
    if (!sortOption) {
      return;
    }
    setPosts(sortPosts(posts, sortOption));
  }, [sortOption]);
  return (
    <View>
      <CustomButton
        title=""
        type="transparent"
        IconLeft={() => (
          <Image source={icons.sort} tintColor="#253048" className="w-6 h-6" />
        )}
        onPress={() => setOpenSortMenu(!openSortMenu)}
      />
      {openSortMenu && (
        <View>
          <FlatList
            data={sortOptions}
            renderItem={({ item }) => (
              <CustomButton
                title={item.label}
                type="transparent"
                textVariant="primary"
                className="my-2"
                onPress={() => {
                  setSortOption(item.value);
                  setOpenSortMenu(false);
                }}
              />
            )}
            keyExtractor={(item, index) => item.label}
            className="absolute top-1.5 right-0 w-24 py-2 bg-white z-50 border border-neutral-200 rounded-xl"
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default SortMenu;
