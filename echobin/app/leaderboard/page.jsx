'use client';
import React from "react";

export default function Leaderboard() {
  const topPerformers = [
    { rank: 1, user: "John Doe", points: 1200, level: "Gold" },
    { rank: 2, user: "Jane Smith", points: 1100, level: "Silver" },
    { rank: 3, user: "Sam Wilson", points: 1000, level: "Bronze" },
  ];

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
            {topPerformers.map((performer) => (
              <tr key={performer.rank} className="hover:bg-[#F9F9F9]">
                <td className="py-2 px-4 border-b">{performer.rank}</td>
                <td className="py-2 px-4 border-b">{performer.user}</td>
                <td className="py-2 px-4 border-b">{performer.points}</td>
                <td className="py-2 px-4 border-b">{performer.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          
        </div>
      </div>
    </div>
  );
}
