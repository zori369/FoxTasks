import { RoutineType } from "../types/routine";
import { useState } from "react";

function RoutineRow({ id, title, tasks }: RoutineType) {
    const [swipePosition, setSwipePosition] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState("");
    
    const handleTouchStart = (e: React.TouchEvent) => {
        const startX = e.touches[0].clientX;
        setSwipePosition(startX);
    };
    
    const handleTouchMove = (e: React.TouchEvent) => {
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - swipePosition;
    
        if (deltaX < -30) {
            setSwipeDirection("left");
        } else if (deltaX > 30) {
            setSwipeDirection("right");
        } else {
            setSwipeDirection("");
        } 
    };
    
    const handleTouchEnd = () => {
       if (swipeDirection === "left") {
          console.log("Edit");
        } else if (swipeDirection === "right") {
          console.log("delete");
        }
        setSwipePosition(0);
    };

    return (
        <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {swipeDirection === "left" && <button>Apply</button>}
            <div>
                <h2>{title}</h2>
            </div>
            {swipeDirection === "right" && <button>Delete</button>}
        </div>
    );
}

export default RoutineRow;