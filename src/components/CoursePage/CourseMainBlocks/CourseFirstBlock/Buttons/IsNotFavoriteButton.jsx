import { useCallback } from "react";
import { courseService } from "@/services/course.service";
import useTelegramUser from "@/hooks/useTelegramUser";
import { useParams } from "react-router-dom";

export default function IsNotFavoriteButton({ setIsFavorite }) {
  const { userId } = useTelegramUser();

  const { courseId } = useParams();

  const addCourse = useCallback(async () => {
    const responce = await courseService.addCourse(userId, courseId);
    console.log(responce);
    if (responce === 200) {
      setIsFavorite(true);
    }
  }, [userId, courseId, setIsFavorite]);

  return (
    <button className="course-block-button" onClick={() => addCourse()}>
      <span>Поступить на курс</span>

      <svg
        className="course-block-button-icon"
        id="star1"
        width="22"
        height="22"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.5 3H6.5C5.96957 3 5.46086 3.21071 5.08579 3.58579C4.71071 3.96086 4.5 4.46957 4.5 5V19C4.5 19.5304 4.71071 20.0391 5.08579 20.4142C5.46086 20.7893 5.96957 21 6.5 21H12.5M8.5 3V12L11.5 9L14.5 12V3M8.5 3H14.5M14.5 3H18.5C19.0304 3 19.5391 3.21071 19.9142 3.58579C20.2893 3.96086 20.5 4.46957 20.5 5V12M19.5 16V19M19.5 19V22M19.5 19H22.5M19.5 19H16.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
