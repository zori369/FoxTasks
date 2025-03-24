import { useState, useEffect } from "react";

interface TaskProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  alarm?: string;
  color: string;
  length?: number;
}

function TaskRow({ id, title, description, completed, alarm, color, length }: TaskProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [remainingTime, setRemainingTime] = useState(length ? length * 60 : 0);
  const [isRunning, setIsRunning] = useState(false);
  const [swipePosition, setSwipePosition] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");

  // --- Swipe Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].clientX;
    setSwipePosition(startX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const deltaX = endX - swipePosition;

    if (deltaX < -50) {
      setSwipeDirection("left");
    } else if (deltaX > 50) {
      setSwipeDirection("right");
    } else {
      setSwipeDirection("");
    }

    setSwipePosition(0);
  };

  const hasArrow = description || alarm || length;

  // --- Timer Logic ---
  useEffect(() => {
    let timer: number | null = null;

    if (isRunning && remainingTime > 0) {
      timer = window.setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer as number);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer as number);
  }, [isRunning, remainingTime]);

  function startTimer(len: number) {
    setRemainingTime(len * 60);
    setIsRunning(true);
  }

  let minutes = Math.floor(remainingTime / 60);
  let seconds = (remainingTime % 60).toString().padStart(2, "0");

  return (
    <div
      className={color ? color : "gray"}
      style={{ touchAction: "pan-y", padding: "1rem", backgroundColor: color }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div>
        {swipeDirection === "left" && <button>Edit</button>}
        <div>
          <h2>{title}</h2>
          <input type="checkbox" checked={completed} />
        </div>

        {hasArrow && (
          <div>
            {isExpanded && (
              <div>
                {description && <p>{description}</p>}
                {alarm && <p>⏰ Alarm: {alarm}</p>}
                {length && (
                  <div>
                    <p>⏳ Length: {length} min</p>
                    <button onClick={() => startTimer(length)}>
                      {isRunning ? `${minutes}:${seconds}` : `Start: ${length} min`}
                    </button>
                  </div>
                )}
              </div>
            )}
            <button onClick={() => setIsExpanded(!isExpanded)}>v</button>
          </div>
        )}

        {swipeDirection === "right" && <button>Delete</button>}
      </div>
    </div>
  );
}

export default TaskRow;
