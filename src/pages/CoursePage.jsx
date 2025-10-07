import useTelegramUser from "../hooks/useTelegramUser";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import CourseInfo from "../components/CoursePage/CourseInfo";
import useCourse from "../hooks/queries/CoursePage/useCourse";
import { useCourseStore } from "../components/CoursePage/store";
import { useEffect, useRef } from "react";

export default function CoursePage() {
  const { courseId } = useParams();

  const { userId } = useTelegramUser();

  const { data, isPending } = useCourse(userId, courseId);
  const setAllModulesOpen = useCourseStore((state) => state.setAllModulesOpen);

  const initialized = useRef(false);

  useEffect(() => {
    if (data && !initialized.current) {
      setAllModulesOpen(data.courseModulesInfo);
      initialized.current = true;
    }
  }, [data, setAllModulesOpen]);

  return (
    <>
      {isPending && <Loader />}
      {!isPending && data && <CourseInfo courseData={data} />}
    </>
  );
}
