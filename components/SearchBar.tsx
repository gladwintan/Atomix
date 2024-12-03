import { View, Text, TextInput, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { icons } from "@/constants";
import { Image } from "react-native";
import CustomButton from "./CustomButton";

const SearchBar = ({
  handleSearch,
}: {
  handleSearch: (query: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const animation = useRef(new Animated.Value(0)).current;

  // Expand the search bar
  const expandSearchBar = () => {
    setIsExpanded(true);
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Collapse the search bar
  const collapseSearchBar = () => {
    setIsExpanded(false);
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Interpolate width based on the animation value
  const searchBarWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"], // Adjust the expanded width as needed
  });

  return (
    <Animated.View
      className="flex-row bg-transparent items-center justify-center p-1.5 px-2 min-w-[36px]"
      style={{ width: searchBarWidth }}
    >
      <CustomButton
        title=""
        type="transparent"
        IconLeft={() => (
          <Image
            source={icons.search}
            tintColor="#6b7280"
            className="w-5 h-5"
          />
        )}
        disabled={isExpanded}
        onPress={expandSearchBar}
      />
      {isExpanded && (
        <TextInput
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          className="w-11/12 bg-white ml-1.5 p-1 font-openSans text-dark-base"
          autoFocus
          onBlur={collapseSearchBar}
          returnKeyLabel="Search"
          keyboardType="default"
          multiline={false}
          onSubmitEditing={() => handleSearch(searchQuery)}
        />
      )}
    </Animated.View>
  );
};

export default SearchBar;
