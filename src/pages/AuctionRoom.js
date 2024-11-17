import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "./PlayerCard";

const AuctionRoom = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auction");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="auction-room">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
};

export default AuctionRoom;