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
                <button onClick={() => navigate("/routine/new")}>Add</button>
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
                            const existingTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
                          
                            const routineTasks = routineToApply!.tasks.map(task => ({
                                ...task,
                                id: crypto.randomUUID(),
                                completed: false,
                            }));
                          
                            if (data.type === "weekly") {
                                localStorage.setItem("weeklyRoutines", JSON.stringify([
                                    ...(JSON.parse(localStorage.getItem("weeklyRoutines") || "[]")),
                                    { routineId: routineToApply!.id, days: data.days }
                                ]));
                            } else {
                                data.dates.forEach(date => {
                                    existingTasks[date] = [...(existingTasks[date] || []), ...routineTasks];
                                });
                            
                                localStorage.setItem("tasks", JSON.stringify(existingTasks));
                            }
                          
                            setShowApplyPopup(false);
                            setRoutineToApply(null);
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