import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/type";
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
  const [filterOption, setFilterOption] = useState({ type: "", option: "" });
  const [openFilterMenu, setOpenFilterMenu] = useState(false);

  useEffect(() => {
    if (!filterOption) {
      return;
    }
    console.log(filterPosts(posts, filterOption.type, filterOption.option));
    setPosts(filterPosts(posts, filterOption.type, filterOption.option));
  }, [filterOption]);

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
        <View>
          <FlatList
            data={filterOptions}
            renderItem={({ item }) => (
              <CustomButton
                title={item.label}
                type="transparent"
                textVariant="primary"
                textClassName="text-center"
                className="my-2"
                onPress={() => {
                  setFilterOption({
                    type: item.value.type,
                    option: item.value.option,
                  });
                  setOpenFilterMenu(false);
                }}
              />
            )}
            keyExtractor={(item, index) => item?.label}
            className="absolute top-1.5 right-0 w-36 py-2 bg-white z-50 border border-neutral-200 rounded-xl"
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
};

export default FilterMenu;
