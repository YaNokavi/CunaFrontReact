import { Link } from "react-router-dom";
import ProgressBarReviews from "@/UI/ProgressBarReviews";
import CourseFirstBlock from "./CourseMainBlocks/CourseFirstBlock/CourseFirstBlock";
import CourseLearnings from "./CourseMainBlocks/CourseLearnings";
import CourseSyllabus from "./CourseMainBlocks/CourseSyllabus";
import LastStep from "./CourseMainBlocks/LastStep";

export default function CourseInfo({
  courseData,
  openModules,
  setOpenModules,
  isFavorive,
  setIsFavorite,
}) {
  const { lastCompletedStep, learningOutcomes, courseModulesInfo, ratingInfo } =
    courseData;

  return (
    <>
      {courseData && (
        <CourseFirstBlock
          courseData={courseData}
          setIsFavorite={setIsFavorite}
          isFavorive={isFavorive}
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

      {ratingInfo && (
        <div className="block course-block">
          <div className="course-block-header">Отзывы</div>
          <ProgressBarReviews ratingInfo={ratingInfo} />
          <Link to="rating" className="course-block-button">
            <span id="button-href-comments"> Перейти к отзывам </span>
          </Link>
        </div>
      )}
    </>
  );
}
