import { Href, router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";

import { ExploreCourse } from "@/types/type";

import ExploreCourseCard from "./ExploreCourseCard";
import CourseListLoader from "../../loader/CourseListLoader";
import OptionsMenu from "../../OptionsMenu";
import { filterOptions, sortOptions } from "@/data/courses/dropdown-options";
import { filterCourses, sortCourses } from "@/lib/courses";

const ExploreCourses = ({
  exploreCourses,
}: {
  exploreCourses: ExploreCourse[];
}) => {
  const [filtering, setFiltering] = useState(false);
  const [filteredCourses, setFilteredCourses] =
    useState<ExploreCourse[]>(exploreCourses);

  return (
    <>
      <View className="mt-5 mb-4 px-2 flex-row justify-between">
        <Text className="ml-2 font-openSans-bold text-base text-dark-base">
          Explore
        </Text>
        <OptionsMenu
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          filterFunction={filterCourses}
          sortFunction={sortCourses}
          data={exploreCourses}
          setData={setFilteredCourses}
          setLoading={setFiltering}
        />
      </View>
      {filtering ? (
        <CourseListLoader />
      ) : (
        <FlatList
          data={filteredCourses}
          renderItem={({ item }) => (
            <ExploreCourseCard
              courseId={item.course_id}
              courseName={item.course_name}
              description={item.description}
              lessons={item.lessons}
              quizzes={item.quizzes}
              difficulty={item.difficulty}
              level={item.level}
              subject={item.subject}
              completionStatus={item.completionStatus}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => (
            <View className="p-1.5 border-t border-neutral-100" />
          )}
          className="bg-white pb-10"
          scrollEnabled={false}
        />
      )}
    </>
  );
};

export default ExploreCourses;
