import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FilterOption, Post } from "@/types/type";
import { icons } from "@/constants";
import CustomButton from "../CustomButton";
import { filterPosts, sortPosts } from "@/lib/forum";
import ReactNativeModal from "react-native-modal";

const filterOptions = [
  {
    label: "H1 Chemistry",
    value: { type: "difficulty", option: "H1 Chemistry" },
  },
  {
    label: "H2 Chemistry",
    value: { type: "difficulty", option: "H2 Chemistry" },
  },
  {
    label: "Atomic Structure",
    value: { type: "topic", option: "Atomic Structure" },
  },
  {
    label: "Chemical Bonding",
    value: { type: "topic", option: "Chemical Bonding" },
  },
  {
    label: "Acid-Base Equilibrium",
    value: { type: "topic", option: "Acid-Base Equilibrium" },
  },
  {
    label: "Intro to Organic Chem",
    value: { type: "topic", option: "Intro to Organic Chem" },
  },
];

const sortOptions = [
  { label: "Newest", value: "Newest", descending: true },
  { label: "Likes", value: "Likes", descending: true },
  { label: "Replies", value: "Replies", descending: true },
];

const OptionsMenu = ({
  posts,
  setPosts,
}: {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    FilterOption[]
  >([]);
  const [sortOption, setSortOption] = useState({
    value: "Newest",
    descending: true,
  });

  const filterAndSortPosts = () => {
    let filteredPosts = posts;
    if (selectedFilterOptions.length != 0) {
      filteredPosts = filterPosts(posts, selectedFilterOptions);
    }
    setPosts(sortPosts(filteredPosts, sortOption.value, sortOption.descending));
  };

  return (
    <View>
      <CustomButton
        title=""
        type="transparent"
        IconLeft={() => (
          <Image
            source={icons.options}
            tintColor="#253048"
            className="w-6 h-6"
          />
        )}
        onPress={() => setShowOptionsMenu(true)}
      />
      {showOptionsMenu && (
        <ReactNativeModal
          isVisible
          backdropOpacity={0.3}
          onBackdropPress={() => {
            filterAndSortPosts();
            setShowOptionsMenu(false);
          }}
          className="m-0 justify-end"
        >
          <View className="bg-white h-4/6">
            <ScrollView className="p-5">
              <Text className="font-openSans-bold mb-2 text-dark-base">
                Filter by
              </Text>
              <FlatList
                data={filterOptions}
                renderItem={({ item }) => (
                  <CustomButton
                    title={item.label}
                    type="transparent"
                    textVariant="primary"
                    className="my-2 self-start"
                    IconLeft={() =>
                      selectedFilterOptions.some(
                        (option) => option.label == item.label
                      ) ? (
                        <Image
                          source={icons.checkbox}
                          tintColor="#253048"
                          className="w-5 h-5 mr-2"
                        />
                      ) : (
                        <Image
                          source={icons.checkboxBlank}
                          tintColor="#253048"
                          className="w-5 h-5 mr-2"
                        />
                      )
                    }
                    onPress={() => {
                      const optionSelected = selectedFilterOptions.some(
                        (option) => option.label == item.label
                      );
                      if (optionSelected) {
                        setSelectedFilterOptions(
                          selectedFilterOptions.filter(
                            (option) => !(option.label == item.label)
                          )
                        );
                      } else {
                        setSelectedFilterOptions([
                          ...selectedFilterOptions,
                          item,
                        ]);
                      }
                    }}
                  />
                )}
                keyExtractor={(item, index) => item?.label}
                ItemSeparatorComponent={() => <View className="h-1.5" />}
                scrollEnabled={false}
              />

              <Text className="font-openSans-bold mt-6 mb-2 text-dark-base">
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
                            sortOption.descending
                              ? icons.arrowDown
                              : icons.arrowUp
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
                ItemSeparatorComponent={() => <View className="h-1.5" />}
                scrollEnabled={false}
              />
            </ScrollView>
          </View>
        </ReactNativeModal>
      )}
    </View>
  );
};

export default OptionsMenu;
