import { useState, useEffect } from "react";
import { RoutineType } from "../types/routine";
import { useNavigate } from "react-router-dom";
import RoutineRow from "../components/RoutineRow";
import ApplyRoutinePopup from "../components/ApplyRoutinePopup";

function RoutineScreen() {
    const navigate = useNavigate();
    const [routines, setRoutines] = useState<RoutineType[]>([]);
    const [showApplyPopup, setShowApplyPopup] = useState(false);
    const [routineToApply, setRoutineToApply] = useState<RoutineType | null>(null);


    function loadTasks() {
        const allTasks = JSON.parse(localStorage.getItem("routines") || "[]");
        setRoutines(allTasks);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const handleApply = (routine: RoutineType) => {
        setRoutineToApply(routine);
        setShowApplyPopup(true);
        console.log(routine);
    };

    function handleDelete(id: string) {
        const existing = JSON.parse(localStorage.getItem("routines") || "[]");
        const updated = existing.filter((r: RoutineType) => r.id !== id);
        localStorage.setItem("routines", JSON.stringify(updated));
        loadTasks();
    }

    return (
        <div>
            <button onClick={()=>navigate("/calendar")}>📅 Calendar</button>
            <div>
                <h2>Routines</h2>
                <button>Add</button>
                <div>
                {routines.map((routine) => (
                    <RoutineRow
                        key={routine.id}
                        {...routine}
                        onDelete={handleDelete}
                        onApply={handleApply}
                    />
                ))}
                </div>
                <div>
                {showApplyPopup && routineToApply && (
                    <ApplyRoutinePopup
                        onClose={() => {
                        setShowApplyPopup(false);
                        setRoutineToApply(null);
                        }}
                        onApplyToDays={(data) => {
                        console.log("Apply this routine to:", data);
                        }}
                        routine={routineToApply}
                    />
                )}
                </div>
            </div>
        </div>
    );
}

export default RoutineScreen;