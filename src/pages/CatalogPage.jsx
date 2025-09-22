import { useCallback, useEffect, useState } from "react";
import { catalogService } from "../services/catalog.service";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import CourseBaseInfoBlock from "../UI/CourseBaseInfoBlock/CourseBaseInfoBlock";

export default function CatalogPage() {
  const [coursesData, setCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useTelegramUser();

  const getCourses = useCallback(async () => {
    setIsLoading(true);
    const courses = await catalogService.getCourses(userId);
    setCoursesData(courses);
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && coursesData && coursesData.length > 0 ? (
        coursesData.map((course) => (
          <CourseBaseInfoBlock key={course.id} course={course} />
        ))
      ) : (
        <p>Ошибка.</p>
      )}
    </>
  );
}
