import CourseFirstBlock from "./CourseMainBlocks/CourseFirstBlock/CourseFirstBlock";
import CourseLearnings from "./CourseMainBlocks/CourseLearnings";
import CourseSyllabus from "./CourseMainBlocks/CourseSyllabus";
import LastStep from "./CourseMainBlocks/LastStep";
import CourseReviews from "./CourseMainBlocks/CourseReviews";

export default function CourseInfo({ courseData }) {
  const {
    lastCompletedStep,
    learningOutcomes,
    courseModulesInfo,
    ratingInfo,
    favorite,
  } = courseData;

  return (
    <>
      {courseData && (
        <CourseFirstBlock courseData={courseData} isFavorite={favorite} />
      )}
      {favorite && lastCompletedStep && (
        <LastStep lastCompletedStep={lastCompletedStep} />
      )}

      {learningOutcomes && (
        <CourseLearnings learningOutcomes={learningOutcomes} />
      )}

      {courseModulesInfo && (
        <CourseSyllabus courseModulesInfo={courseModulesInfo} />
      )}

      {ratingInfo && <CourseReviews ratingInfo={ratingInfo} />}
    </>
  );
}
