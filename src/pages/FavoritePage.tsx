import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import CourseBaseInfoBlock from "../UI/CourseBaseInfoBlock/CourseBaseInfoBlock";
import useCoursesFavorite from "../hooks/queries/FavoritePage/useCoursesFavorite";

export default function FavoritePage() {
  const { userId } = useTelegramUser();

  const { data, isPending, isFetching } = useCoursesFavorite(userId);

  return (
    <>
      {(isPending || isFetching) && <Loader />}
      {!isPending &&
        !isFetching &&
        data &&
        data.length > 0 &&
        data.map((course) => (
          <CourseBaseInfoBlock key={course.id} course={course} />
        ))}
    </>
  );
}
