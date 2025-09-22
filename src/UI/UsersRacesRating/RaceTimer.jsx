import { useEffect, useState } from "react";

export default function RaceTimer({ eventEndDate }) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    function startCountdown(endDate) {
      const countDownDate = new Date(endDate).getTime();

      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
          clearInterval(intervalId);
          setCountdown("Награды уже в пути!");
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let displayString = "";
        if (days > 0) displayString += days + "д ";
        if (hours > 0 || days > 0) displayString += hours + "ч ";
        if (minutes > 0 || hours > 0 || days > 0)
          displayString += minutes + "м ";
        displayString += seconds + "с";

        setCountdown(displayString);
      }, 1000);

      return intervalId;
    }

    const intervalId = startCountdown(eventEndDate);

    return () => clearInterval(intervalId);
  }, [eventEndDate]);

  return <div className="text-timer">{eventEndDate && countdown}</div>;
}
