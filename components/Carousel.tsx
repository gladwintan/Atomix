import React, { useEffect, useRef, useState } from "react";
import { FlatListProps } from "react-native";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ListRenderItem,
} from "react-native";

interface GenericFlatListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  containerClassName?: string;
  dotClassName?: string;
  dotContainerClassName?: string;
}

/**
 * A reusable FlatList-based component that displays a horizontal list with a sliding indicator.
 *
 * @template T - The type of items in the FlatList data array.
 * @param {Array<T>} data - The data array to render.
 * @param {(info: { item: T; index: number }) => React.ReactElement} renderItem - The function to render each item.
 * @param {(item: T, index: number) => string} keyExtractor - A function to extract unique keys for each item.
 * @param {string} [containerClassName] - Tailwind ClassName for styling of main container.
 * @param {string} [dotClassName] - Tailwind ClassName for styling of dot indicator.
 * @param {string} [dotContainerClassName] - Tailwind classname for styling of dot indicator container.
 * @param {object} [props] - Additional FlatList properties.
 *
 * @returns {React.ReactElement} The rendered FlatList with an interactive indicator.
 */
const Carousel = <T,>({
  data,
  renderItem,
  keyExtractor,
  containerClassName,
  dotClassName,
  dotContainerClassName,
  ...props
}: GenericFlatListProps<T> &
  Omit<FlatListProps<T>, "data" | "renderItem" | "keyExtractor">) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const [itemWidths, setItemWidths] = useState<number[]>([]);
  const [cumulativeOffsets, setCumulativeOffsets] = useState<number[]>([]);

  const onLayout = (event: any, index: number) => {
    const { width } = event.nativeEvent.layout;
    setItemWidths((prevWidths) => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  useEffect(() => {
    const offsets = itemWidths.reduce<number[]>(
      (acc, width) => {
        acc.push(acc[acc.length - 1] + width);
        return acc;
      },
      [0]
    );
    setCumulativeOffsets(offsets);
  }, [itemWidths]);

  // Scroll to a specific index when a dot is pressed
  const scrollToIndex = (index: number) => {
    const offset = itemWidths
      .slice(0, index)
      .reduce((sum, width) => sum + width, 0);
    flatListRef.current?.scrollToOffset({ offset, animated: true });
  };

  const { width } = Dimensions.get("window");

  return (
    <View className={`bg-white ${containerClassName}`}>
      {/* Horizontal FlatList */}
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={(info) => (
          <View onLayout={(event) => onLayout(event, info.index)}>
            {renderItem(info)}
          </View>
        )}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() => (
          <View className="p-3 h-32 w-[100vw] border">
            <Text>No posts to show</Text>
          </View>
        )}
        className="bg-white"
        scrollEnabled
        horizontal
        //snapToAlignment="center"
        //snapToInterval={Dimensions.get("window").width}
        decelerationRate="fast"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        {...props}
      />

      {/* Sliding Indicator */}
      <View className="flex-row justify-center">
        {data.map((_: unknown, index: number) => {
          if (cumulativeOffsets.length < 2) return null;

          const inputRange = cumulativeOffsets.map(
            (_, i) => cumulativeOffsets[i]
          );

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: inputRange.map((_, i) => (i === index ? 1.4 : 1)),
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: inputRange.map((_, i) => (i === index ? 1 : 0.5)),
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity
              key={index}
              onPress={() => scrollToIndex(index)}
              className={`p-1.5 ${dotContainerClassName}`}
            >
              <Animated.View
                style={[
                  {
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
                className={`bg-neutral-400 w-2 h-2 rounded-full ${dotClassName}`}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;
