import { useState } from "react";
import { useEffect } from "react";

interface TaskPorps {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    alarm?: string;
    color: string;
    length?: number;
}

function TaskRow({id, title, description, completed, alarm, color, length}: TaskPorps){
    const [isExpanded, setIsExpanded] = useState(false);
    const [remainingTime, setRemainingTime] = useState(length ? length * 60 : 0);
    const [isRunning, setIsRunning] = useState(false);
    const [swipePosition, setSwipePosition] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState("");
    const handleTouchStart = (e: React.TouchEvent) => {
        setSwipePosition(e.touches[0].clientX);
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (swipePosition === 0) return; // If no swipe was started, do nothing
      
        const endX = e.changedTouches[0].clientX; // Get the final X position
        const deltaX = endX - swipePosition; // Calculate swipe distance
      
        if (deltaX < -50) {
          // Swiped left (more than 50px)
          setSwipeDirection("left");
        } else if (deltaX > 50) {
          // Swiped right (more than 50px)
          setSwipeDirection("right");
        } else {
          // Small swipe, reset
          setSwipeDirection("");
        }
      
        setSwipePosition(0); // Reset touch position
    };

    const hasArrow = description || alarm || length;
    
    useEffect(() => {
        let timer: number | null = null;
      
        if (isRunning && remainingTime > 0) {
          timer = window.setInterval(() => {
            setRemainingTime((prev) => {
              if (prev <= 1) {
                console.log("ALARM"); // Placeholder for alarm functionality
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
    
    function startTimer(len:number) {
        setRemainingTime(len * 60);
        setIsRunning(true);
    };

    let minutes = Math.floor(remainingTime/60);
    let seconds = (remainingTime % 60).toString().padStart(2, "0");

    return(
        <div className={color? color : "gray"} onTouchStart={()=>handleTouchStart} onTouchEnd={()=>handleTouchEnd}>
            <div>
                {swipeDirection==="left" && (
                    <button>edit</button>
                )}
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
                                {length && <div><p>⏳ Length: {length} min</p>
                                    <button onClick={()=>startTimer(length)}>
                                        {isRunning ? `${minutes}:${seconds}` : `Start: ${length} min`}
                                    </button>
                                </div>}
                            </div>
                        )}
                        <button onClick={()=>setIsExpanded(!isExpanded)}>v</button>
                    </div>
                )}
                {swipeDirection==="right" && (
                    <button>delete</button>
                )}
            </div>
        </div>
    );
}

export default TaskRow;