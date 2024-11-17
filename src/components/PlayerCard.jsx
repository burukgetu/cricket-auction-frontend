import React, { useState } from "react";
import axios from "axios";

const PlayerCard = ({ player }) => {
  const [bidAmount, setBidAmount] = useState("");
  const [timer, setTimer] = useState(60); // 60 seconds timer
  const [isSold, setIsSold] = useState(false);

  // Countdown timer for auction
  React.useEffect(() => {
    if (timer > 0 && !isSold) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer, isSold]);

  const placeBid = async () => {
    if (bidAmount > player.price) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auction/bid",
          {
            playerId: player._id,
            bidAmount: bidAmount,
          }
        );
        if (response.data.success) {
          setIsSold(true); // Mark player as sold
        }
      } catch (error) {
        console.error("Error placing bid", error);
      }
    } else {
      alert("Your bid must be higher than the current price.");
    }
  };

  return (
    <div className="player-card">
      <h3>{player.name}</h3>
      <p>Price: ${player.price}</p>
      <p>Role: {player.role}</p>
      <p>Timer: {timer}s</p>
      <input
        type="number"
        placeholder="Place your bid"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        disabled={isSold}
      />
      <button onClick={placeBid} disabled={isSold || timer <= 0}>
        Place Bid
      </button>
      {isSold && <p>Player Sold!</p>}
    </div>
  );
};

export default PlayerCard;
