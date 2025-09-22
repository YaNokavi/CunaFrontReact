import { useCallback, useState } from "react";
import { courseService } from "@/services/course.service";
import useTelegramUser from "@/hooks/useTelegramUser";
import { Link, useParams } from "react-router-dom";
import CustomModal from "@/UI/Modal/CustomModal";

export default function IsFavoriteButtons({ setIsFavorite }) {
  const { userId } = useTelegramUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { courseId } = useParams();

  const leaveCourse = useCallback(async () => {
    const responce = await courseService.leaveCourse(userId, courseId);
    console.log(responce);
    if (responce === 200) {
      setIsFavorite(false);
    }
  }, [userId, courseId, setIsFavorite]);

  const LeaveIcon = () => (
    <svg
      className="course-block-button-favorite-icon"
      width="22"
      height="22"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 3H6.5C5.96957 3 5.46086 3.21071 5.08579 3.58579C4.71071 3.96086 4.5 4.46957 4.5 5V19C4.5 19.5304 4.71071 20.0391 5.08579 20.4142C5.46086 20.7893 5.96957 21 6.5 21H12.5M8.5 3V12L11.5 9L14.5 12V3M8.5 3H14.5M14.5 3H18.5C19.0304 3 19.5391 3.21071 19.9142 3.58579C20.2893 3.96086 20.5 4.46957 20.5 5V12M17 19L19 21L22 16"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Link to="syllabus" className="course-block-button">
        <span>Приступить к изучению</span>
      </Link>
      <button
        className="course-block-button-favorite"
        onClick={() => setIsModalOpen(true)}
      >
        <LeaveIcon />
      </button>
      <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <span>Вы уверены, что хотите покинуть курс?</span>
        <footer>
          <button onClick={leaveCourse}>Да</button>
          <button onClick={() => setIsModalOpen(false)}>Нет</button>
        </footer>
      </CustomModal>
    </div>
  );
}
