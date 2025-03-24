import { useState } from "react";

interface TaskPopupProps {
    onClose: () => void;
    date: string;
}

function TaskPopup({onClose, date}: TaskPopupProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [alarm, setAlarm] = useState("");
    const [duration, setDuration] = useState("");
    const [color, setColor] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const existing = JSON.parse(localStorage.getItem("tasks") || "{}");
        const newTask = {
            id: crypto.randomUUID(),
            title,
            description,
            alarm,
            length: Number(duration),
            color,
            completed: false  
        };

        const updated = {
            ...existing,
            [date]: [...(existing[date] || []), newTask]
        };
        localStorage.setItem("tasks", JSON.stringify(updated));
        onClose();
    };

    return (
      <div>
        <div>
          <button type="button" onClick={onClose}>Close</button>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input required 
                type="text" 
                name="title" 
                id="title" 
                value={title} 
                onChange={(e)=>setTitle(e.target.value)}
            />
  
            <label htmlFor="description">Description</label>
            <textarea name="description" 
                id="description" 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}    
            />
  
            <label htmlFor="alarm">Set alarm</label>
            <input name="alarm" 
                type="time" 
                id="alarm"
                value={alarm}
                onChange={(e)=>setAlarm(e.target.value)} 
            />
  
            <label htmlFor="duration">Set duration in minutes</label>
            <input name="duration" 
                type="number" 
                id="duration"
                value={duration}
                onChange={(e)=>setDuration(e.target.value)} 
            />
  
            <label>Pick color</label>
            <div>
              {["blue", "red", "green", "pink", "purple", "orange", "yellow", "gray", "white"].map((color) => (
                <label key={color}>
                    <input type="radio" 
                        name="color" 
                        value={color}
                        onChange={(e)=>setColor(e.target.value)} 
                    />
                  {color}
                </label>
              ))}
            </div>
  
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default TaskPopup;
  