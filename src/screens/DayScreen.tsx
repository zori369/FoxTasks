import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskRow from "../components/TaskRow";
import TaskPopup from "../components/TaskPopup";
import { TaskType } from "../types/task";

interface DayScreenPorps {
    isRoutineMode?: boolean;
}

function DayScreen({isRoutineMode}: DayScreenPorps) {
    const navigate = useNavigate();
    const params = useParams();
    const date = params.date;
    const [showPopup, setShowPopup] = useState(false);
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [editingTask, setEditingTask] = useState<TaskType | null>(null);

    function loadTasks() {
        const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
        const dayTasks = allTasks[date!] || [];
        setTasks(dayTasks);
    }

    function handleDelete(id: string) {
        const allTasks = JSON.parse(localStorage.getItem("tasks") || "{}");
        const updatedDayTasks = (allTasks[date!] || []).filter((task: TaskType) => task.id !== id);
        allTasks[date!] = updatedDayTasks;
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        loadTasks();
    }

    function handleEdit(task: TaskType) {
        setEditingTask(task);
        setShowPopup(true);
    }

    useEffect(() => {
        loadTasks();
    }, [date]);

    return (
        <div>
            <button onClick={()=>navigate("/calendar")}>Calendar</button>
            <div>
                <div>
                    <h1>{date}</h1>
                    <button onClick={() => setShowPopup(true)}>add</button>
                </div>
                <div>
                    {tasks.map(task => (
                        <TaskRow key={task.id} 
                                {...task}
                                onDelete={()=>handleDelete(task.id)}
                                onEdit={()=>handleEdit(task)} 
                        />
                    ))}
                    {showPopup && (
                        <TaskPopup
                            onClose={() => {
                            setShowPopup(false);
                            setEditingTask(null);
                            loadTasks();
                            }}
                            date={date!}
                            task={editingTask}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default DayScreen;