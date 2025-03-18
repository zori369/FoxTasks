import GardenCarousel from "../components/GardenCarousel";

function GardenScreen() {
  return (
    <div>
      <div>
        <button>📅 Calendar</button>
        <button>🏆 Achievements</button>
      </div>
      <h1>Garden Screen</h1>
      <GardenCarousel />
    </div>
  );
}

export default GardenScreen;