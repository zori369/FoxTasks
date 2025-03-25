import { useState, useEffect } from "react";
import { RoutineType } from "../types/routine";
import RoutineRow from "../components/RoutineRow";

function RoutineScreen() {
    const [routines, setRoutines] = useState<RoutineType[]>([]);

    function loadTasks() {
        const allTasks = JSON.parse(localStorage.getItem("routines") || "[]");
        setRoutines(allTasks);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const handleApply = (routine: RoutineType) => {
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
            </div>
        </div>
    );
}

export default RoutineScreen;