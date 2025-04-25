import React from 'react';
import '../pages-css/Leaderboard.css';

const Leaderboard = () => {
  const startNewGame = () => {
    alert("Starting a new game!");
  };

  return (
    <div className="background-page">
      <button className="start-game-btn" onClick={startNewGame}>Start New Game</button>
      <div className="score">
        Your score is ..#
      </div>

      <div className="stage">
        <div className="stage-front">
          Leaderboard
        </div>
        
        <div className="tower third">
          <div className="face front"></div>
          <div className="face right"></div>
          <div className="face top">
            <div className="player">Player 3</div>
          </div>
        </div>

        <div className="tower first">
          <div className="face front"></div>
          <div className="face top">
            <div className="player">Player 1</div>
          </div>
        </div>

        <div className="tower second">
          <div className="face front"></div>
          <div className="face left"></div>
          <div className="face top">
            <div className="player">Player 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;