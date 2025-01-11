'use client';
import React, { useState, useEffect } from 'react';
import { getRanking } from '@/utils/db/action';

export default function Leaderboard() {
  const [rankings, setRankings] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      getRanking().then((data) => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          // Sort rankings by points in descending order
          const sortedRankings = data.sort((a, b) => b.points - a.points);

          // Add rank and level to each user
          const rankedRankings = sortedRankings.map((user, index) => ({
            ...user,
            rank: index + 1,
            level: determineLevel(user.points),
          }));

          setRankings(rankedRankings);
        } else {
          console.error('getRanking did not return an array', data);
        }
      });
    }
  }, [isMounted]);

  // Function to determine user level based on points
  const determineLevel = (points) => {
    if (points >= 40) return 'Gold';
    if (points >= 20) return 'Silver';
    if (points >= 10) return 'Bronze';
    return 'Beginner';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#023838] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/path/to/pattern.svg')] bg-cover"></div>

      <div className="relative z-10 p-6 max-w-2xl w-full backdrop-blur-md bg-white/10 rounded-3xl shadow-xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center animate-bounce">
          🏆 Leaderboard 🏆
        </h2>

        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-t-lg p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center">
            <span className="font-semibold text-lg">Top Performers (Weekly)</span>
          </div>
        </div>

        <table className="w-full text-left border-collapse overflow-hidden mt-4 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#FFF9E5] text-[#023838]">
              <th className="py-3 px-4 border-b border-gray-300">RANK</th>
              <th className="py-3 px-4 border-b border-gray-300">USER</th>
              <th className="py-3 px-4 border-b border-gray-300">POINTS</th>
              <th className="py-3 px-4 border-b border-gray-300">LEVEL</th>
            </tr>
          </thead>
          <tbody>
            {rankings.length > 0 ? (
              rankings.map((performer, index) => (
                <tr
                  key={performer.id}
                  className={`${
                    index === 0
                      ? 'bg-yellow-200'
                      : index === 1
                      ? 'bg-gray-200'
                      : index === 2
                      ? 'bg-[#cd7f32]'
                      : 'bg-white'
                  } hover:bg-green-100`}
                >
                  <td className="py-3 px-4 border-b border-gray-300 text-center font-bold">
                    {performer.rank}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-300">{performer.name}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{performer.points}</td>
                  <td className="py-3 px-4 border-b border-gray-300">{performer.level}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          {/* Future: Add a button here if needed */}
        </div>
      </div>
    </div>
  );
}
