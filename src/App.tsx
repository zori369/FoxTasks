import { Routes, Route } from "react-router-dom";
import GardenScreen from "./screens/GardenScreen";
import CalendarScreen from "./screens/CalendarScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GardenScreen />} />
      <Route path="/calendar" element={<CalendarScreen />} />
    </Routes>
  );
}

export default App;
