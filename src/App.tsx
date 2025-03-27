import { Routes, Route } from "react-router-dom";
import GardenScreen from "./screens/GardenScreen";
import CalendarScreen from "./screens/CalendarScreen";
import DayScreen from "./screens/DayScreen";
import RoutineScreen from "./screens/RoutineScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GardenScreen />} />
      <Route path="/calendar" element={<CalendarScreen />} />
      <Route path="/day/:date" element={<DayScreen />} />
      <Route path="/routines" element={<RoutineScreen />} />
      <Route path="/routine/new" element={<DayScreen isRoutineMode />} />
    </Routes>
  );
}

export default App;
