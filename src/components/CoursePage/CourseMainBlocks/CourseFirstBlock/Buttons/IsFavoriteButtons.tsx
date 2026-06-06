import { useState } from "react";
import useTelegramUser from "@/hooks/useTelegramUser";
import { Link, useParams } from "react-router-dom";
import CustomModal from "@/UI/Modal/CustomModal";
import IconLeave from "./IconLeave";
import { useCourseStore } from "../../../store";
import useLeaveCourse from "../../../../../hooks/queries/CoursePage/useLeaveCourse";

export default function IsFavoriteButtons() {
  const { userId } = useTelegramUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const favorite = useCourseStore((state) => state.favorite);

  const { courseId } = useParams();

  const mutation = useLeaveCourse(userId, courseId);

  const leaveCourse = () => {
    mutation.mutate(!favorite);
    setIsModalOpen(false);
  };

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
