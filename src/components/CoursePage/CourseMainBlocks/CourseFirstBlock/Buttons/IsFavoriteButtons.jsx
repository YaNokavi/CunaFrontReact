import { useCallback, useState } from "react";
import { courseService } from "@/services/course.service";
import useTelegramUser from "@/hooks/useTelegramUser";
import { Link, useParams } from "react-router-dom";
import CustomModal from "@/UI/Modal/CustomModal";
import IconLeave from "./IconLeave";

export default function IsFavoriteButtons({ setIsFavorite }) {
  const { userId } = useTelegramUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { courseId } = useParams();
//TODO Откат UI
  const leaveCourse = useCallback(async () => {
    const responce = await courseService.leaveCourse(userId, courseId);
    console.log(responce);
    if (responce === 200) {
      setIsFavorite(false);
    }
  }, [userId, courseId, setIsFavorite]);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Link to="syllabus" className="course-block-button">
        <span>Приступить к изучению</span>
      </Link>
      <button
        className="course-block-button-favorite"
        onClick={() => setIsModalOpen(true)}
      >
        <IconLeave />
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
