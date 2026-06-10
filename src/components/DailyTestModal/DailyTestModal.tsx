import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { DailyTestData } from "../../types/dailyTest.types";
import { dailyTestService } from "../../services/dailyTest.service";

import IViewOverlay from "../../UI/IViewOverlay";
import styles from "./styles.module.scss";

interface DailyTestModalProps {
  userId: number;
  contentUrl: string;
  testStartDate: string;
  onClose: () => void;
}

const TIMER_DURATION = 20000;

export default function DailyTestModal({
  userId,
  contentUrl,
  testStartDate,
  onClose,
}: DailyTestModalProps) {
  const [testData, setTestData] = useState<DailyTestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<
    "correct" | "incorrect" | "timeout" | null
  >(null);
  const [isClosable, setIsClosable] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // const {
  //   ref: imgContainerRef,
  //   iview,
  //   closeIView,
  // } = useIView<HTMLDivElement>();

  const borderGreenRef = useRef<HTMLDivElement>(null);
  const borderRedRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const hasTimedOut = useRef(false);
  const timerPausedRef = useRef(false);
  const isRedRef = useRef(false);
  const isBlinkingRef = useRef(false);
  const handleSubmitRef = useRef<
    (options: string[], isTimeout?: boolean) => void
  >(() => {});

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    dailyTestService
      .loadTestContent(contentUrl)
      .then(async (data: DailyTestData) => {
        if (cancelled) return;

        if (data.image?.url) {
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = data.image!.url;
          });
        }

        await new Promise((r) => setTimeout(r, 500));

        if (!cancelled) {
          setTestData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки теста:", err);
        if (!cancelled) onClose();
      });

    return () => {
      cancelled = true;
    };
  }, [contentUrl]);

  useEffect(() => {
    if (isLoading || result !== null) return;

    timerPausedRef.current = false;
    startTimeRef.current = performance.now() - elapsedRef.current;

    const loop = () => {
      if (timerPausedRef.current) return;

      const now = performance.now();
      elapsedRef.current = now - startTimeRef.current;
      const left = Math.max(0, TIMER_DURATION - elapsedRef.current);
      const prog = Math.min(elapsedRef.current / TIMER_DURATION, 1);
      const deg = prog * 360;

      const green = borderGreenRef.current;
      const red = borderRedRef.current;

      if (!isRedRef.current) {
        if (green) {
          green.style.background = `conic-gradient(
            from 0deg,
            #4caf50 0deg,
            #4caf50 ${deg}deg,
            transparent ${deg}deg,
            transparent 360deg
          )`;
        }
      } else {
        if (red) {
          red.style.background = `conic-gradient(
            from 0deg,
            #f44336 0deg,
            #f44336 ${deg}deg,
            transparent ${deg}deg,
            transparent 360deg
          )`;
        }
      }

      if (timerRef.current) {
        timerRef.current.textContent = `${Math.max(0, Math.ceil(left / 1000))}с`;
      }

      if (prog > 0.6 && !isRedRef.current) {
        isRedRef.current = true;
        if (green) green.style.opacity = "0";
        if (red) {
          red.style.background = `conic-gradient(
            from 0deg,
            #f44336 0deg,
            #f44336 ${deg}deg,
            transparent ${deg}deg,
            transparent 360deg
          )`;
          requestAnimationFrame(() => {
            if (red) red.style.opacity = "1";
          });
        }
      }

      if (prog > 0.8 && !isBlinkingRef.current) {
        isBlinkingRef.current = true;
        setIsBlinking(true);
      }

      if (prog < 1) {
        rafRef.current = requestAnimationFrame(loop);
      } else if (!hasTimedOut.current) {
        hasTimedOut.current = true;
        handleSubmitRef.current([], true);
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoading, result]);

  const handleOptionChange = (option: string, isMultiple: boolean) => {
    if (isMultiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      );
    } else {
      setSelectedOptions([option]);
    }
  };

  const handleSubmit = async (options: string[], isTimeout = false) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    timerPausedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    if (!testData) return;

    const isMultiple = testData.answer.length > 1;
    let isCorrect = false;

    if (!isTimeout) {
      isCorrect = isMultiple
        ? JSON.stringify([...options].sort()) ===
          JSON.stringify([...testData.answer].sort())
        : options[0] === testData.answer[0];
    }

    await dailyTestService.sendTestResult(userId, isCorrect, testStartDate);

    setResult(isTimeout ? "timeout" : isCorrect ? "correct" : "incorrect");
    setIsClosable(true);

    setTimeout(() => {
      onClose();
    }, 2500);
  };

  handleSubmitRef.current = handleSubmit;

  const isMultiple = testData ? testData.answer.length > 1 : false;
  const canSubmit = selectedOptions.length > 0 && !isSubmitting;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (
    <>
      {createPortal(
        <div
          className={styles.overlay}
          onClick={isClosable ? onClose : undefined}
        >
          <div className={styles.modalBorder}>
            <div className={styles.borderTrack} />

            {!isLoading && (
              <>
                <div
                  ref={borderGreenRef}
                  className={styles.borderProgress}
                  style={{ opacity: 1 }}
                />
                <div
                  ref={borderRedRef}
                  className={`${styles.borderProgressRed} ${isBlinking ? styles.blink : ""}`}
                  style={{ opacity: 0 }}
                />
              </>
            )}

            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.header}>
                <div />
                <span className={styles.title}>Ежедневный тест!</span>
                <span
                  ref={timerRef}
                  className={`${styles.timer} ${isBlinking ? styles.timerRed : ""}`}
                >
                  {!isLoading ? `${Math.ceil(TIMER_DURATION / 1000)}с` : ""}
                </span>
              </div>

              {isLoading && (
                <div className={styles.skeleton}>
                  <div
                    className={`${styles.skeletonBlock} ${styles.skeletonTitle}`}
                  />
                  <div
                    className={`${styles.skeletonBlock} ${styles.skeletonOption}`}
                  />
                  <div
                    className={`${styles.skeletonBlock} ${styles.skeletonOption}`}
                  />
                  <div
                    className={`${styles.skeletonBlock} ${styles.skeletonOption}`}
                  />
                  <div
                    className={`${styles.skeletonBlock} ${styles.skeletonOption}`}
                  />
                  <div
                    className={`${styles.skeletonBlock} ${styles.skeletonBtn}`}
                  />
                </div>
              )}

              {!isLoading && testData && result === null && (
                <div className={styles.testContent}>
                  <h2 className={styles.question}>{testData.question}</h2>

                  {testData.image?.url && (
                    <div ref={imgContainerRef} className={styles.imageWrapper}>
                      <img
                        src={testData.image.url}
                        alt="Иллюстрация к вопросу"
                        data-iview
                        data-src={testData.image.url}
                        style={{
                          maxHeight: testData.image.height,
                          maxWidth: "100%",
                          objectFit: "contain",
                          cursor: "zoom-in",
                        }}
                        draggable={false}
                      />
                    </div>
                  )}

                  <p className={styles.hint}>
                    Выберите{" "}
                    {isMultiple
                      ? "один или несколько вариантов"
                      : "один вариант"}
                  </p>

                  <div className={styles.options}>
                    {testData.options.map((option) => (
                      <label key={option} className={styles.option}>
                        <input
                          type={isMultiple ? "checkbox" : "radio"}
                          name="daily-question"
                          value={option}
                          checked={selectedOptions.includes(option)}
                          onChange={() =>
                            handleOptionChange(option, isMultiple)
                          }
                          disabled={isSubmitting}
                        />
                        {option}
                      </label>
                    ))}
                  </div>

                  <div className={styles.submitRow}>
                    <button
                      className={`step-block-button${!canSubmit ? " disabled" : ""}`}
                      disabled={!canSubmit}
                      onClick={() => handleSubmit(selectedOptions)}
                    >
                      {isSubmitting ? (
                        <div
                          className="load-task-animation"
                          style={{ width: 20, height: 20, borderWidth: 3 }}
                        />
                      ) : (
                        "Ответить"
                      )}
                    </button>
                  </div>
                </div>
              )}

              {result !== null && (
                <div className={styles.result}>
                  {result === "correct" && (
                    <>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9 0.25C7.26942 0.25 5.57769 0.763179 4.13876 1.72464C2.69983 2.6861 1.57832 4.05267 0.916058 5.65152C0.253791 7.25037 0.0805121 9.00971 0.418133 10.707C0.755753 12.4044 1.58911 13.9635 2.81282 15.1872C4.03653 16.4109 5.59563 17.2443 7.29296 17.5819C8.9903 17.9195 10.7496 17.7462 12.3485 17.0839C13.9473 16.4217 15.3139 15.3002 16.2754 13.8612C17.2368 12.4223 17.75 10.7306 17.75 9C17.75 6.67936 16.8281 4.45376 15.1872 2.81282C13.5462 1.17187 11.3206 0.25 9 0.25ZM7.75 12.4938L4.625 9.36875L5.61875 8.375L7.75 10.5062L12.3813 5.875L13.3788 6.86625L7.75 12.4938Z"
                          fill="#43A047"
                        />
                      </svg>
                      <span style={{ color: "#43A047", fontWeight: 600 }}>
                        Правильно!
                      </span>
                    </>
                  )}
                  {(result === "incorrect" || result === "timeout") && (
                    <>
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2.63604 2.63604C0.948212 4.32387 0 6.61305 0 9C0 11.3869 0.948212 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9C18 6.61305 17.0518 4.32387 15.364 2.63604C13.6761 0.948212 11.3869 0 9 0C6.61305 0 4.32387 0.948212 2.63604 2.63604ZM12.1989 5.80115C12.0713 5.67357 11.8982 5.60189 11.7178 5.60189C11.5374 5.60189 11.3643 5.67357 11.2368 5.80115L9 8.03926L6.76325 5.80115C6.63567 5.67357 6.46263 5.60189 6.2822 5.60189C6.10177 5.60189 5.92873 5.67357 5.80115 5.80115C5.67357 5.92873 5.60189 6.10177 5.60189 6.2822C5.60189 6.46263 5.67357 6.63567 5.80115 6.76325L8.03926 9L5.80115 11.2368C5.67357 11.3643 5.60189 11.5374 5.60189 11.7178C5.60189 11.8982 5.67357 12.0713 5.80115 12.1989C5.92873 12.3264 6.10177 12.3981 6.2822 12.3981C6.46263 12.3981 6.63567 12.3264 6.76325 12.1989L9 9.96074L11.2368 12.1989C11.3643 12.3264 11.5374 12.3981 11.7178 12.3981C11.8982 12.3981 12.0713 12.3264 12.1989 12.1989C12.3264 12.0713 12.3981 11.8982 12.3981 11.7178C12.3981 11.5374 12.3264 11.3643 12.1989 11.2368L9.96074 9L12.1989 6.76325C12.3264 6.63567 12.3981 6.46263 12.3981 6.2822C12.3981 6.10177 12.3264 5.92873 12.1989 5.80115Z"
                          fill="#E53232"
                        />
                      </svg>
                      <span style={{ color: "#E53232", fontWeight: 600 }}>
                        {result === "timeout" ? "Время вышло" : "Неправильно!"}
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>,
        modalRoot,
      )}

      {iview && (
        <IViewOverlay src={iview.src} alt={iview.alt} onClose={closeIView} />
      )}
    </>
  );
}
