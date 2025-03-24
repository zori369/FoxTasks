import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import TaskRow from "../components/TaskRow";
import TaskPopup from "../components/TaskPopup";

function DayScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const date = params.date;
    const [showPopup, setShowPopup] = useState(false);

    const testTask = {
        id: "1",
        title: "Test Task",
        description: "This is a sample task.",
        completed: false,
        alarm: "17:30",
        color: "gray",
        length: 5, // 5 minutes
      };

    return (
        <div>
            <button onClick={()=>navigate("/calendar")}>Calendar</button>
            <div>
                <div>
                    <h1>{date}</h1>
                    <button onClick={() => setShowPopup(true)}>add</button>
                </div>
                <div>
                <TaskRow 
                    id={testTask.id}
                    title={testTask.title}
                    description={testTask.description}
                    completed={testTask.completed}
                    alarm={testTask.alarm}
                    color={testTask.color}
                    length={testTask.length}
                />
                {showPopup && <TaskPopup onClose={() => setShowPopup(false)} />}
                </div>
            </div>
        </div>
    );
}

export default DayScreen;