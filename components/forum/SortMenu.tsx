import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/type";
import { icons } from "@/constants";
import CustomButton from "../CustomButton";
import { sortPosts } from "@/lib/forum";

const sortOptions = [
  { label: "Newest", value: "Newest", descending: true },
  { label: "Likes", value: "Likes", descending: true },
  { label: "Replies", value: "Replies", descending: true },
];

const SortMenu = ({
  posts,
  setPosts,
}: {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const [sortOption, setSortOption] = useState({
    value: "Newest",
    descending: true,
  });
  const [openSortMenu, setOpenSortMenu] = useState(false);

  useEffect(() => {
    if (!sortOption) {
      return;
    }
    setPosts(sortPosts(posts, sortOption.value, sortOption.descending));
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
        <View className="absolute top-8 right-2 w-24 p-2 px-3 bg-white items-start z-50 border border-neutral-200 rounded-xl">
          <Text className="font-openSans-semibold mb-1.5 text-dark-base">
            Sort by
          </Text>
          <FlatList
            data={sortOptions}
            renderItem={({ item }) => (
              <CustomButton
                title={item.label}
                type="transparent"
                textVariant="primary"
                className="my-1.5 self-start"
                IconRight={() =>
                  item.value == sortOption.value && (
                    <Image
                      source={
                        sortOption.descending ? icons.arrowDown : icons.arrowUp
                      }
                      tintColor="#253048"
                      className="w-5 h-5 ml-1"
                    />
                  )
                }
                onPress={() => {
                  item.value == sortOption.value
                    ? setSortOption({
                        ...sortOption,
                        descending: !sortOption.descending,
                      })
                    : setSortOption({
                        value: item.value,
                        descending: item.descending,
                      });
                }}
              />
            )}
            keyExtractor={(item, index) => item.label}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default SortMenu;
