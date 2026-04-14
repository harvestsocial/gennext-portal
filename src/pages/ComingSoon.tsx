import React, { useState, useEffect, useMemo, useCallback } from "react";

interface ComingSoonContent {
  title: string;
  subtitle: string;
}

interface ComingSoonConfig {
  targetDate: string;
  content: ComingSoonContent;
  countdownLabels: string[];
}

const comingSoonData: ComingSoonConfig = {
  targetDate: "2025-02-24",
  content: {
    title: "Opening Soon!",
    subtitle: "Registration is",
  },
  countdownLabels: ["Months", "Days", "Hours", "Minutes", "Seconds"],
};

const ComingSoon: React.FC = () => {
  const { targetDate, content, countdownLabels } = comingSoonData;

  const targetDateTime = useMemo(
    () => new Date(targetDate).getTime(),
    [targetDate]
  );

  const calculateTimeLeft = useCallback((): number[] => {
    const difference = targetDateTime - Date.now();

    if (difference <= 0) {
      return countdownLabels.map(() => 0);
    }

    return [
      Math.floor(difference / (1000 * 60 * 60 * 24 * 30)) || 0,
      Math.floor((difference / (1000 * 60 * 60 * 24)) % 30) || 0,
      Math.floor((difference / (1000 * 60 * 60)) % 24) || 0,
      Math.floor((difference / (1000 * 60)) % 60) || 0,
      Math.floor((difference / 1000) % 60) || 0,
    ];
  }, [targetDateTime, countdownLabels]);

  const [timeLeft, setTimeLeft] = useState<number[]>(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="up-comming tm-center">
      <div className="up-comming__wapper" id="time-countdown-section">
        <div className="up-comming__info">
          {content.subtitle && (
            <p className="up-comming__desp">{content.subtitle}</p>
          )}
          {content.title && (
            <h1 className="up-comming__title">{content.title}</h1>
          )}
        </div>

        <div className="up-comming__timer-content">
          {countdownLabels.map((label, i) => (
            <div className="up-comming__timer" key={label}>
              <h2 className="up-comming__number">{timeLeft[i]}</h2>
              <p className="up-comming__text">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ComingSoon;
