import { Routes, Route } from "react-router-dom";
import GardenScreen from "./screens/GardenScreen";
import CalendarScreen from "./screens/CalendarScreen";
import DayScreen from "./screens/DayScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GardenScreen />} />
      <Route path="/calendar" element={<CalendarScreen />} />
      <Route path="/day/:date" element={<DayScreen />} />
    </Routes>
  );
}

export default App;
