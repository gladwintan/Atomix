import { View, Text, FlatList, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ExploreCourse } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import CustomButton from "@/components/CustomButton";
import { graphics, icons } from "@/constants";
import { Href, router } from "expo-router";
import OptionsMenu from "@/components/OptionsMenu";
import EmptyState from "@/components/EmptyState";
import { filterOptions, sortOptions } from "@/data/courses/dropdown-options";
import { filterCourses, getAllCourses, sortCourses } from "@/lib/courses";
import CourseListLoader from "@/components/loader/CourseListLoader";
import ExploreCourseCard from "@/components/courses/ExploreCourseCard";
import { formatCourseName } from "@/lib/utils";

const SearchPage = () => {
  const { user } = useUser();
  const userClerkId = user?.id;

  const { query } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [loadError, SetLoadError] = useState({ error: "" });

  const [searchResults, setSearchResults] = useState<ExploreCourse[]>([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState<
    ExploreCourse[]
  >([]);

  useEffect(() => {
    handleSearch(query as string);
  }, [query]);

  const handleSearch = async (searchQuery: string) => {
    if (!userClerkId) return;

    const query = searchQuery.toLowerCase().trim();
    const courses = await fetchCourses();

    const filteredCourses = courses.filter(
      (course: ExploreCourse) =>
        course.course_name.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.subject.toLowerCase().includes(query) ||
        query === ""
    );

    setSearchResults(filteredCourses);
    setFilteredSearchResults(filteredCourses);
    setTimeout(() => setLoading(false), 500);
  };

  const fetchCourses = useCallback(async () => {
    if (!userClerkId) return;

    setLoading(true);
    const { courses, success, error } = await getAllCourses(userClerkId);
    if (courses) {
      return courses;
    }
    if (error) {
      SetLoadError({ error: error });
    }
  }, [userClerkId]);

  return (
    <SafeAreaView edges={["left", "right", "top"]} className="flex-1">
      <View className="items-end h-12">
        <CustomButton
          title="course"
          textVariant="back"
          type="back"
          IconLeft={() => (
            <Image
              source={icons.arrowLeft}
              tintColor="#364463"
              className="w-3 h-3 mr-1"
            />
          )}
          className="absolute left-3 top-1"
          onPress={() => router.replace("/(root)/(tabs)/course")}
        />
        <SearchBar handleSearch={handleSearch} />
      </View>

      <View className="px-2 justify-between flex-row items-center">
        <Text className="font-openSans ml-1 text-dark-base text-xs">
          Showing {searchResults.length} of {searchResults.length} results
        </Text>
        <OptionsMenu
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          data={searchResults}
          setData={setFilteredSearchResults}
          filterFunction={filterCourses}
          sortFunction={sortCourses}
          setLoading={setLoading}
        />
      </View>

      {loading ? (
        <CourseListLoader
          fetchError={loadError.error}
          fetchCourses={async () => await handleSearch(query as string)}
        />
      ) : (
        <FlatList
          data={filteredSearchResults}
          renderItem={({ item }) => (
            <ExploreCourseCard
              courseName={item.course_name}
              description={item.description}
              lessons={item.lessons}
              quizzes={item.quizzes}
              difficulty={item.difficulty}
              level={item.level}
              subject={item.subject}
              completionStatus={item.completionStatus}
              onPress={() =>
                router.push(
                  `/courses/${formatCourseName(item.course_name)}` as Href
                )
              }
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View className="p-1 border-t border-neutral-100" />
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No search results found"
              description="Try adjusting your search to find what you are looking for"
              imageSrc={graphics.searchEmpty}
              containerClassName="mt-10"
            />
          )}
          className="bg-white"
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled
        />
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
