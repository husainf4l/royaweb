import React from "react";
import { Player } from "@/services/analysis/demoData";

interface PlayerMarkerProps {
  player: Player;
  index: number;
}

const PlayerMarker: React.FC<PlayerMarkerProps> = ({ player, index }) => {
  // Position is in percentage (0-100) of the screen
  const style = {
    left: `${player.position.x}%`,
    top: `${player.position.y}%`,
    backgroundColor:
      index === 0 ? "rgba(52, 211, 153, 0.8)" : "rgba(59, 130, 246, 0.8)",
    border: `2px solid ${
      index === 0 ? "rgb(16, 185, 129)" : "rgb(37, 99, 235)"
    }`,
  };

  return (
    <div
      key={player.id}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold z-20"
      style={style}
    >
      <img
        src={player.avatar}
        alt={player.name}
        className="absolute w-full h-full rounded-full object-cover"
      />
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
        {player.name}
      </div>
    </div>
  );
};

export default PlayerMarker;
