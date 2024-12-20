import { View, Text, Image, FlatList, ScrollView } from "react-native";
import { useState } from "react";
import { FilterOption, SortOption } from "@/types/type";
import { icons } from "@/constants";
import CustomButton from "./CustomButton";
import ReactNativeModal from "react-native-modal";

/**
 * OptionsMenu is a generic React component that provides filtering and sorting capabilities for a dataset.
 *
 * @template T - The type of the items in the data array.
 *
 * @param {Object} props - The component props.
 * @param {FilterOption[]} props.filterOptions - An array of filtering options to apply to the data.
 * @param {SortOption[]} props.sortOptions - An array of sorting options to apply to the data.
 * @param {T[]} props.data - The data array to be filtered and sorted.
 * @param {React.Dispatch<React.SetStateAction<T[]>>} props.setData - A state setter function to update the data after applying filters or sorting.
 * @param {(data: T[], selectedFilterOptions: FilterOption[]) => T[]} props.filterFunction - A function to filter the data based on selected filter options.
 * @param {(data: T[], value: string, descending: boolean) => T[]} props.sortFunction - A function to sort the data based on a selected value and order.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setLoading - A state setter function to indicate loading state during data manipulation.
 * @param {string} [props.menuContainerClassName] - TailWind classname for styling the container of the options menu.
 *
 * @returns {React.ReactElement} The rendered options menu component.
 */
const OptionsMenu = <T,>({
  filterOptions,
  sortOptions,
  data,
  setData,
  filterFunction,
  sortFunction,
  setLoading,
  menuContainerClassName,
}: {
  filterOptions: FilterOption[];
  sortOptions: SortOption[];
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  filterFunction: (data: T[], selectedFilterOptions: FilterOption[]) => T[];
  sortFunction: (data: T[], value: string, descending: boolean) => T[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  menuContainerClassName?: string;
}) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    FilterOption[]
  >([]);
  const [sortOption, setSortOption] = useState<SortOption>(sortOptions[0]);

  const filterAndSortData = () => {
    setLoading(true);
    let filteredData = data;
    if (selectedFilterOptions.length != 0) {
      filteredData = filterFunction(data, selectedFilterOptions);
    }
    setData(
      sortFunction(filteredData, sortOption.value, sortOption.descending)
    );
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <View className={`${menuContainerClassName}`}>
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
            filterAndSortData();
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
                        : setSortOption(item);
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
