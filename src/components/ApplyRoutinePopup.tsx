import { useState } from "react";
import { RoutineType } from "../types/routine";
import DatePicker from "react-multi-date-picker";

interface ApplyRoutinePopupProps {
    onClose: () => void;
    onApplyToDays:  (data: { type: "weekly"; days: string[] } | { type: "custom"; dates: string[] }) => void;
    routine: RoutineType;
}

function ApplyRoutinePopup({ onClose, onApplyToDays, routine }: ApplyRoutinePopupProps) {
    const [mode, setMode] = useState<"weekly" | "custom">("weekly");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const weekdayLabel = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [selectedDates, setSelectedDates] = useState<any[]>([]);

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    function handleApply() {
        if (mode === "weekly") {
            onApplyToDays({ type: "weekly", days: selectedDays });
        } else {
            const formattedDates = selectedDates.map((date) =>
                date.format("YYYY-MM-DD")
            );
            onApplyToDays({ type: "custom", dates: formattedDates });
        }
      
        onClose();
    }

    return (
        <div>
            <div>
                <h2>Apply Routine</h2>
                <button onClick={onClose}>Close</button>
            </div>

            <div>
                <button onClick={() => setMode("weekly")}>Weekly</button>
                <button onClick={() => setMode("custom")}>Custom dates</button>
            </div>

            {mode === "weekly" && (
                <div>
                {weekdayLabel.map((day) => (
                    <label key={day}>
                        <input
                            type="checkbox"
                            checked={selectedDays.includes(day)}
                            onChange={() => toggleDay(day)}
                        />
                        {day}
                    </label>
                ))}
                </div>
            )}
            {mode === "custom" && (
                <div>
                    <DatePicker
                    multiple
                    value={selectedDates}
                    onChange={setSelectedDates}
                    />
                </div>
            )}
            <button onClick={handleApply}>Apply Routine</button>
        </div>
    );
}

export default ApplyRoutinePopup;
