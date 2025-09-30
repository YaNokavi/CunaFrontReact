import CourseFirstBlock from "./CourseMainBlocks/CourseFirstBlock/CourseFirstBlock";
import CourseLearnings from "./CourseMainBlocks/CourseLearnings";
import CourseSyllabus from "./CourseMainBlocks/CourseSyllabus";
import LastStep from "./CourseMainBlocks/LastStep";
import CourseReviews from "./CourseMainBlocks/CourseReviews";
import { useEffect, useState } from "react";

export default function CourseInfo({
  courseData,
  openModules,
  setOpenModules,
}) {
  const {
    lastCompletedStep,
    learningOutcomes,
    courseModulesInfo,
    ratingInfo,
    favorite,
  } = courseData;

  const [isFavorive, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  return (
    <>
      {courseData && (
        <CourseFirstBlock
          courseData={courseData}
          isFavorive={isFavorive}
          setIsFavorite={setIsFavorite}
        />
      )}
      {isFavorive && lastCompletedStep && (
        <LastStep lastCompletedStep={lastCompletedStep} />
      )}

      {learningOutcomes && (
        <CourseLearnings learningOutcomes={learningOutcomes} />
      )}

      {courseModulesInfo && (
        <CourseSyllabus
          openModules={openModules}
          setOpenModules={setOpenModules}
          courseModulesInfo={courseModulesInfo}
        />
      )}

      {ratingInfo && <CourseReviews ratingInfo={ratingInfo} />}
    </>
  );
}
