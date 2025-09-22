import { useCallback, useEffect, useState } from "react";
import { favoriteService } from "../services/favorite.service";
import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import CourseBaseInfoBlock from "../UI/CourseBaseInfoBlock/CourseBaseInfoBlock";
import FavoriteCoursesEmpty from "../components/FavoritePage/FavoriteCoursesEmpty/FavoriteCoursesEmpty";

export default function FavoritePage() {
  const [coursesData, setCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useTelegramUser();

  const getCourses = useCallback(async () => {
    setIsLoading(true);
    const courses = await favoriteService.getFavoriteCourses(userId);
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
        <FavoriteCoursesEmpty />
      )}
    </>
  );
}
