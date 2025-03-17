import { useTaskStore } from "./store/useTaskStore";

function App() {
  const { tasks, addTask, toggleTask, removeTask } = useTaskStore();

  return (
    <div>
      <h1>FoxTasks</h1>
      <button onClick={() => addTask("New Task")}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
              onClick={() => toggleTask(task.id)}
            >
              {task.title}
            </span>
            <button onClick={() => removeTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
