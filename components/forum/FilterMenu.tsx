import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { FilterOption, Post } from "@/types/type";
import { icons } from "@/constants";
import CustomButton from "../CustomButton";
import { filterPosts, sortPosts } from "@/lib/forum";

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

const FilterMenu = ({
  posts,
  setPosts,
}: {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) => {
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    FilterOption[]
  >([]);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  useEffect(() => {
    if (selectedFilterOptions.length == 0) {
      setPosts(posts);
    }

    setPosts(filterPosts(posts, selectedFilterOptions));
  }, [selectedFilterOptions]);

  return (
    <View>
      <CustomButton
        title=""
        type="transparent"
        IconLeft={() => (
          <Image
            source={icons.filter}
            tintColor="#253048"
            className="w-6 h-6"
          />
        )}
        onPress={() => setOpenFilterMenu(!openFilterMenu)}
      />
      {openFilterMenu && (
        <View className="absolute top-8 right-2 w-40 p-2 px-3 items-start bg-white z-50 border border-neutral-200 rounded-xl">
          <Text className="font-openSans-semibold mb-1.5 text-dark-base">
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
                IconRight={() =>
                  selectedFilterOptions.some(
                    (option) => option.label == item.label
                  ) && (
                    <Image
                      source={icons.check}
                      tintColor="#253048"
                      className="w-5 h-5 ml-1"
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
                    setSelectedFilterOptions([...selectedFilterOptions, item]);
                    setOpenFilterMenu(false);
                  }
                }}
              />
            )}
            keyExtractor={(item, index) => item?.label}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default FilterMenu;
