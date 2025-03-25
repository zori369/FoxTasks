import { useState } from "react";
import { RoutineType } from "../types/routine";

interface ApplyRoutinePopupProps {
    onClose: () => void;
    onApplyToDays: () => void;
    routine: RoutineType;
};

function ApplyRoutinePopup({onClose, onApplyToDays, routine}: ApplyRoutinePopupProps) {
    const [mode, setMode] = useState<"weekly" | "custom">("weekly");

    return (
        <div>
            <div>
                <h2>Apply Routine</h2>
                <button>Close</button>
            </div>
            <div>
                <button onClick={() => setMode("weekly")}>weekly</button>
                <button onClick={() => setMode("custom")}>Custom dates</button>
            </div>
        </div>
    );
}

export default ApplyRoutinePopup;