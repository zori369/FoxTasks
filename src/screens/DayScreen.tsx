import { useNavigate, useParams } from "react-router-dom";
import TaskRow from "../components/TaskRow";

function DayScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const date = params.date;

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
                    <button onClick={()=>console.log("Open pop up")}>add</button>
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
                </div>
            </div>
        </div>
    );
}

export default DayScreen;