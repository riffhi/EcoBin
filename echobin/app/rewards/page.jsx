'use client';
import React from "react";

export default function Rewards() {
  const rewardPoints = 0; // Replace this value with dynamic data if needed

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FDF2D6]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-[#000000]">Rewards</h2>
        <div className="bg-[#FFF9E5] p-4 rounded-lg border border-[#D6D6D6]">
          <h3 className="text-lg font-semibold text-[#000000]">Reward Balance</h3>
          <p className="text-2xl font-bold text-[#008000] mt-2">{rewardPoints}</p>
          <p className="text-gray-500">Available Points</p>
        </div>
      </div>
    </div>
  );
}
