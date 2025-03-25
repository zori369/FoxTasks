import { RoutineType } from "../types/routine";
import { useState } from "react";

interface RoutineRowProps extends RoutineType {
    onApply: (routine:RoutineType) => void;
    onDelete: (id: string) => void;
}

function RoutineRow({ id, title, tasks, onApply, onDelete }: RoutineRowProps) {
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
            onApply({id, title, tasks});
        } else if (swipeDirection === "right") {
            onDelete(id);
        }
        setSwipePosition(0);
    };

    return (
        <div 
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {swipeDirection === "right" && <button>Apply</button>}
            <div>
                <h2>{title}</h2>
            </div>
            {swipeDirection === "left" && <button>Delete</button>}
        </div>
    );
}

export default RoutineRow;