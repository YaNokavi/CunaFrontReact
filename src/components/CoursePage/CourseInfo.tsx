import CourseFirstBlock from "./CourseMainBlocks/CourseFirstBlock/CourseFirstBlock";
import CourseLearnings from "./CourseMainBlocks/CourseLearnings";
import CourseSyllabus from "./CourseMainBlocks/CourseSyllabus";
import LastStep from "./CourseMainBlocks/LastStep";
import CourseReviews from "./CourseMainBlocks/CourseReviews";
import type { ICourseDetails } from "../../types/CourseTypes/course.types";

interface Props {
  courseData: ICourseDetails;
}

export default function CourseInfo({ courseData }: Props) {
  const { lastCompletedStep, learningOutcomes, courseModulesInfo, ratingInfo } =
    courseData;

  return (
    <>
      {courseData && <CourseFirstBlock courseData={courseData} />}

      {lastCompletedStep && (
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
