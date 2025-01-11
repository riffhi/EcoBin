'use client';
import React, { useState, useEffect } from "react";
import { getUserByEmail } from "@/utils/db/action";
import { useSession, signIn, signOut } from "next-auth/react";

// API call to fetch user reward points
// const fetchUserPoints = async (email) => {
//   try {
//     const response = await fetch(`/api/rewards?email=${email}`);
//     const data = await response.json();
//     return data.points;
//   } catch (error) {
//     console.error("Error fetching user points:", error);
//     return 0; // Fallback to 0 points if there's an error
//   }
// };

export default function Rewards() {
  const { data: session } = useSession();
  const [rewardPoints, setRewardPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState(null);

    useEffect(() => {
          if (session) {
            setEmail(session.user.email);
            fetchuser();
            setLoading(false);
          }
        }, [session]);


   const fetchuser = async () => {
    try {
      const user = await getUserByEmail(email);
      setUser(user);
      setRewardPoints(user[0].points);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  




      


  // useEffect(() => {
  //   const fetchPoints = async () => {
  //     setLoading(true);
  //     const userEmail = localStorage.getItem('userEmail'); // Assuming email is stored in localStorage
  //     if (userEmail) {
  //       const points = await fetchUserPoints(userEmail);
  //       setRewardPoints(points);
  //     }
  //     setLoading(false);
  //   };

  //   fetchPoints();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#023838]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-center text-[#000000]">Rewards</h2>
        <div className="bg-[#FFF9E5] p-4 rounded-lg border border-[#D6D6D6]">
          <h3 className="text-lg font-semibold text-[#000000]">Reward Balance</h3>
          {loading ? (
            <p className="text-2xl font-bold text-[#008000] mt-2">Loading...</p>
          ) : (
            <p className="text-2xl font-bold text-[#008000] mt-2">{rewardPoints}</p>
          )}
          <p className="text-gray-500">Available Points</p>
          {/* {JSON.stringify(user)} */}
        </div>
      </div>
    </div>
  );
}
