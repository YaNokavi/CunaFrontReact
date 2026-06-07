import { useState, useEffect, useContext } from "react";
import useTelegramUser from "../hooks/useTelegramUser";
import TelegramUserContext from "../context/UserTelegramContext";
import Loader from "../UI/Loader/Loader";
import CourseBaseInfoBlock from "../UI/CourseBaseInfoBlock/CourseBaseInfoBlock";
import useCoursesFavorite from "../hooks/queries/FavoritePage/useCoursesFavorite";
import useSendUserInfo from "../hooks/queries/FavoritePage/useSendUserInfo";
import DailyTestModal from "../components/DailyTestModal/DailyTestModal";

interface DailyTestState {
  contentUrl: string;
  testStartDate: string;
}

export default function FavoritePage() {
  const { userId } = useTelegramUser();
  const { username, userAvatarUrl } = useContext(TelegramUserContext);

  const [dailyTest, setDailyTest] = useState<DailyTestState | null>(null);
  const [initDone, setInitDone] = useState(false);

  const { mutate: sendUserInfo, isPending: isSending } = useSendUserInfo();

  // Проверяем flagFirstJoin при монтировании
  useEffect(() => {
    if (!userId) return;

    const flagFirstJoin = JSON.parse(
      localStorage.getItem("flagFirstJoin") ?? "false",
    );

    if (flagFirstJoin) {
      const referrerId = JSON.parse(
        localStorage.getItem("referallId") ?? "null",
      );
      const safeReferrerId =
        referrerId && referrerId !== userId ? referrerId : null;

      sendUserInfo(
        {
          userId,
          username,
          avatarUrl: userAvatarUrl,
          referrerId: safeReferrerId,
        },
        {
          onSuccess: (data) => {
            if (data?.contentUrl && data?.testStartDate) {
              setDailyTest({
                contentUrl: data.contentUrl,
                testStartDate: data.testStartDate,
              });
            } else {
              localStorage.setItem("flagFirstJoin", "false");
            }
            setInitDone(true);
          },
          onError: () => {
            setInitDone(true);
          },
        },
      );
    } else {
      setInitDone(true);
    }
  }, [userId]);

  const { data, isPending, isFetching } = useCoursesFavorite(
    initDone ? userId : 0,
  );

  const isLoading = isSending || isPending || isFetching || !initDone;

  return (
    <>
      {isLoading && <Loader />}

      {dailyTest && (
        <DailyTestModal
          userId={userId}
          contentUrl={dailyTest.contentUrl}
          testStartDate={dailyTest.testStartDate}
          onClose={() => {
            setDailyTest(null);
            localStorage.setItem("flagFirstJoin", "false");
          }}
        />
      )}

      {!isLoading &&
        !dailyTest &&
        data &&
        data.length > 0 &&
        (data as Array<{ id: number; [key: string]: unknown }>).map(
          (course) => <CourseBaseInfoBlock key={course.id} course={course} />,
        )}
    </>
  );
}
