import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .order("level", { ascending: false })
        .order("xp", { ascending: false });

      if (data) setPlayers(data);
      else console.error("Error loading leaderboard:", error);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-700 mb-2">🏆 Leaderboard</h2>
      <ul className="inline-block text-left">
        {players.map((p, i) => (
          <li
            key={p.user_id}
            className="py-1 text-sm border-b border-gray-200"
          >
            <span className="font-bold">{i + 1}.</span> {p.email} — Lv {p.level} · {p.xp} XP
          </li>
        ))}
      </ul>
    </div>
  );
}

