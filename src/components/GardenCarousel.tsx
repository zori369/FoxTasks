import { useState, useEffect } from "react";

function GardenCarousel() {
  const [isOpen, setIsOpen] = useState(false);
  let pressTimer: number | null = null;

  useEffect(() => {
    const handlePressStart = () => {
      pressTimer = window.setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    };

    const handlePressEnd = () => {
      if (pressTimer) {
        clearTimeout(pressTimer);
      }
    };

    document.addEventListener("mousedown", handlePressStart);
    document.addEventListener("mouseup", handlePressEnd);
    document.addEventListener("touchstart", handlePressStart);
    document.addEventListener("touchend", handlePressEnd);

    return () => {
      document.removeEventListener("mousedown", handlePressStart);
      document.removeEventListener("mouseup", handlePressEnd);
      document.removeEventListener("touchstart", handlePressStart);
      document.removeEventListener("touchend", handlePressEnd);
    };
  }, []);

  const closeCarousel = (event: MouseEvent) => {
    if (!document.getElementById("carousel-container")?.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", closeCarousel);
    } else {
      document.removeEventListener("mousedown", closeCarousel);
    }

    return () => document.removeEventListener("mousedown", closeCarousel);
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div id="carousel-container">
          <p>Carousel Opened - Items will go here</p>
        </div>
      )}
    </div>
  );
}

export default GardenCarousel;
