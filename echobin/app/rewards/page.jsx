'use client'
import React, { useState, useEffect } from "react";
import { getUserByEmail } from "@/utils/db/action";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Rewards() {
  const { data: session } = useSession();
  const [rewardPoints, setRewardPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (session) {
      setEmail(session.user.email);
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userData = await getUserByEmail(email);
      setUser(userData);
      setRewardPoints(userData[0].points);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#023838] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/path/to/pattern.svg')] bg-cover"></div>

      <div className="relative z-10 p-6 max-w-md w-full backdrop-blur-md bg-white/10 rounded-3xl shadow-xl animate-fade-in">
        <h2 className="text-3xl font-extrabold text-white mb-6 text-center animate-bounce">
          🎉 Rewards 🎉
        </h2>

        <div className="p-6 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold text-[#023838]">Reward Balance</h3>
          {loading ? (
            <p className="text-5xl font-extrabold text-[#008000] my-4">
              Loading...
            </p>
          ) : (
            <p className="text-5xl font-extrabold text-[#008000] my-4">
              {rewardPoints}
            </p>
          )}
          <p className="text-teal-700">Available Points</p>

          {/* Progress Bar */}
          <div className="mt-6 w-full bg-white rounded-full h-3">
            <div
              className="bg-[#008000] h-3 rounded-full transition-all"
              style={{ width: `${rewardPoints}%` }}
            ></div>
          </div>
        </div>

        <button
          className="mt-6 w-full py-3 rounded-lg text-lg font-medium text-white bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 transition-transform transform hover:scale-105"
          style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
        >
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}

