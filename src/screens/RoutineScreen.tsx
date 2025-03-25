import { useState, useEffect } from "react";
import { RoutineType } from "../types/routine";

function RoutineScreen() {
    const [routines, setRoutines] = useState<RoutineType[]>([]);

    function loadTasks() {
        const allTasks = JSON.parse(localStorage.getItem("routines") || "[]");
        setRoutines(allTasks);
    }

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <div>
                <h2>Routines</h2>
                <button>Add</button>
                <div>

                </div>
            </div>
        </div>
    );
}

export default RoutineScreen;