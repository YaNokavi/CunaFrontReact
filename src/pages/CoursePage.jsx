import { useCallback, useEffect, useState, Fragment } from "react";
import { courseService } from "../services/course.service";
import useTelegramUser from "../hooks/useTelegramUser";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import CourseInfo from "../components/CoursePage/CourseInfo";
//TODO Подумать над стейтами
export default function CoursePage() {
  const [courseData, setCourseData] = useState([]);
  const [openModules, setOpenModules] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { courseId } = useParams();

  const { userId } = useTelegramUser();

  const getCourse = useCallback(async () => {
    setIsLoading(true);
    const courseData = await courseService.getCourse(userId, courseId);
    setCourseData(courseData);
    setOpenModules(
      courseData.courseModulesInfo.reduce((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {})
    );
    setIsLoading(false);
  }, [userId, courseId]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && courseData && (
        <CourseInfo
          courseData={courseData}
          openModules={openModules}
          setOpenModules={setOpenModules}
        />
      )}
    </>
  );
}
