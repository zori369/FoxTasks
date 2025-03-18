import { useNavigate } from "react-router-dom";
import GardenCarousel from "../components/GardenCarousel";

function GardenScreen() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button>🏆 Achievements</button>
        <button onClick={()=>navigate("/calendar")}>📅 Calendar</button>
      </div>
      <h1>Garden Screen</h1>
      <GardenCarousel />
    </div>
  );
}

export default GardenScreen;