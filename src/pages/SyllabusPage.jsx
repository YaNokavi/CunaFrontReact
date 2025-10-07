import useTelegramUser from "../hooks/useTelegramUser";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import ModuleInfo from "../components/SyllabusPage/ModuleInfo";
import useSyllabusData from "../hooks/queries/SyllabusPage/useSyllabusData";

export default function SyllabusPage() {
  const { userId } = useTelegramUser();
  const { courseId } = useParams();

  const { data, isPending } = useSyllabusData(userId, courseId);

  return (
    <>
      {isPending && <Loader />}
      {!isPending && data.modules && (
        <div className="block syllabus-block">
          <div className="syllabus-text">Программа курса</div>
          <div className="syllabus-line"></div>

          <div className="syllabus-modules">
            {data.modules.map((module) => (
              <ModuleInfo key={module.number} module={module} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
