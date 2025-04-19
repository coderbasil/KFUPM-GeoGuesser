// GamePage.jsx
import React, { useState, useRef } from "react";
import "../pages-css/GamePage.css";

const dummyPhoto = "./assets/kfupm-bg.jpg";
const CORRECT_POS = { x: 325, y: 447 };

export default function GamePage() {
  const campusMap = "./assets/map.png";
  const [stage, setStage] = useState("view");
  const [guessPos, setGuessPos] = useState(null);
  const [scale, setScale] = useState(0.9);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);

  const mapClickRef = useRef(null);
  const containerRef = useRef(null);
  const mapImageRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    const newScale = Math.min(3, Math.max(0.5, scale * (1 + delta)));
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const newX = mx - (mx - offset.x) * (newScale / scale);
    const newY = my - (my - offset.y) * (newScale / scale);
    setScale(newScale);
    setOffset({ x: newX, y: newY });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
    setStartOffset(offset);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const dx = e.clientX - lastMouse.x;
    const dy = e.clientY - lastMouse.y;
    setOffset({ x: startOffset.x + dx, y: startOffset.y + dy });
  };
  const handleMouseUp = () => {
    setTimeout(() => {}, 100);
    setDragging(false);
  };

  const handleMapClick = (e) => {
    if (isDragging) return;
    const imgRect = mapImageRef.current.getBoundingClientRect();
    const rawX = (e.clientX - imgRect.left) / scale;
    const rawY = (e.clientY - imgRect.top) / scale;
    setGuessPos({
      x: Math.round(rawX),
      y: Math.round(rawY),
    });
    console.log(rawX + " " + rawY);
  };

  const handleGuess = () => {
    if (!guessPos) return;

    const dx = guessPos.x - CORRECT_POS.x;
    const dy = guessPos.y - CORRECT_POS.y;
    const distance = Math.hypot(dx, dy);

    let newScore;
    if (distance <= 20) {
      newScore = 100;
    } else if (distance >= 200) {
      newScore = 0;
    } else {
      newScore = Math.round(100 * (1 - (distance - 20) / (200 - 20)));
    }

    setScore(newScore);
    setStage("result");
  };

  return (
    <div className="game-page">
      {stage === "view" && (
        <div className="view-stage">
          <img src={dummyPhoto} alt="View" className="full-image" />
          <button className="g-button" onClick={() => setStage("guess")}>
            Make a Guess of Where this is!
          </button>
        </div>
      )}

      {stage === "guess" && (
        <div className="guess-stage">
          <img src={dummyPhoto} className="background-image" alt="" />

          <div
            className={`map-container ${isDragging ? "dragging" : ""}`}
            ref={containerRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={campusMap}
              alt="Campus Map"
              ref={mapImageRef}
              className="map-image"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: "top left",
              }}
              draggable={false}
            />

            <div
              ref={mapClickRef}
              className="map-click-layer"
              onClick={handleMapClick}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                transformOrigin: "top left",
              }}
            />

            {guessPos && (
              <div
                className="marker"
                style={{
                  left: guessPos.x * scale + offset.x,
                  top: guessPos.y * scale + offset.y,
                }}
              />
            )}
          </div>

          <button
            className="g-button"
            disabled={!guessPos}
            onClick={handleGuess}
          >
            Submit Guess
          </button>
        </div>
      )}
      {stage === "result" && (
        <div className="result-stage">
          <img src={dummyPhoto} className="background-img" alt="View" />

          <div className="result-card">
            <h2 className="result-title">Your Score</h2>
            <div className="result-score">{score}%</div>
            <button
              className="g-button play-again-btn"
              onClick={() => {
                setScore(0);
                setGuessPos(null);
                setStage("view");
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
