import { useCallback, useEffect, useState } from "react";
import { syllabusService } from "../services/syllabus.service";
import useTelegramUser from "../hooks/useTelegramUser";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import ModuleInfo from "../components/SyllabusPage/ModuleInfo";

export default function SyllabusPage() {
  const [syllabusData, setSyllabusData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useTelegramUser();
  const { courseId } = useParams();

  const getSyllabus = useCallback(async () => {
    setIsLoading(true);
    const syllabusData = await syllabusService.getSyllabus(userId, courseId);
    setSyllabusData(syllabusData.modules);
    setIsLoading(false);
  }, [userId, courseId]);

  useEffect(() => {
    getSyllabus();
  }, [getSyllabus]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && syllabusData && (
        <div className="block syllabus-block">
          <div className="syllabus-text">Программа курса</div>
          <div className="syllabus-line"></div>

          <div className="syllabus-modules">
            {syllabusData.map((module) => (
              <ModuleInfo key={module.number} module={module} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
