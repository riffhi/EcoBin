'use client';
import React from "react";
import { getRanking } from "@/utils/db/action";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [rankings, setRankings] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      getRanking().then((data) => {
        // Sort rankings by points in descending order
        const sortedRankings = data.sort((a, b) => b.points - a.points);
        
        // Add rank to each user
        const rankedRankings = sortedRankings.map((user, index) => ({
          ...user,
          rank: index + 1,
          level: determineLevel(user.points)
        }));

        setRankings(rankedRankings);
      });
    }
  }, [isMounted]);

  // Function to determine user level based on points
  const determineLevel = (points) => {
    if (points >= 40) return "Gold";
    if (points >= 20) return "Silver";
    if (points >= 10) return "Bronze";
    return "Beginner";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#023838]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#000000]">Leaderboard</h2>
        <div className="bg-[#008000] text-white rounded-t-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16l4-4-4-4m8 0l-4 4 4 4"
              />
            </svg>
            <span className="font-semibold text-lg">Top Performers</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </div>
        <table className="w-full text-left border border-gray-300 mt-4">
          <thead>
            <tr className="bg-[#F5F5F5]">
              <th className="py-2 px-4 border-b">RANK</th>
              <th className="py-2 px-4 border-b">USER</th>
              <th className="py-2 px-4 border-b">POINTS</th>
              <th className="py-2 px-4 border-b">LEVEL</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((performer) => (
              <tr key={performer.id} className="hover:bg-[#F9F9F9]">
                <td className="py-2 px-4 border-b">{performer.rank}</td>
                <td className="py-2 px-4 border-b flex items-center">
                  
                  {performer.name}
                </td>
                <td className="py-2 px-4 border-b">{performer.points}</td>
                <td className="py-2 px-4 border-b">{performer.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}