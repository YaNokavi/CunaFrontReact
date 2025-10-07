import useTelegramUser from "../hooks/useTelegramUser";
import Loader from "../UI/Loader/Loader";
import CourseBaseInfoBlock from "../UI/CourseBaseInfoBlock/CourseBaseInfoBlock";
import useCoursesCatalog from "../hooks/queries/CatalogPage/useCoursesCatalog";
//TODO Подумать над отображением загрузки
export default function CatalogPage() {
  const { userId } = useTelegramUser();

  const { data, isPending, isFetching } = useCoursesCatalog(userId);

  return (
    <>
      {(isPending || isFetching) && <Loader />}
      {!isPending && !isFetching && data && data.length > 0 ? (
        data.map((course) => (
          <CourseBaseInfoBlock key={course.id} course={course} />
        ))
      ) : (
        <p>Ошибка.</p>
      )}
    </>
  );
}
