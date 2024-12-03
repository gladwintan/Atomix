import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";

const SearchPage = () => {
  const { query } = useLocalSearchParams();
  console.log(query);
  return (
    <View>
      <Text>S</Text>
    </View>
  );
};

export default SearchPage;
