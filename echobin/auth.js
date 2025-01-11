import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail, createUser } from "@/utils/db/action.js";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        console.log("USER", user);

        // Admin-specific logic
        if (user.email === "ecobinwork10@gmail.com") {
          const existingAdmin = await getUserByEmail(user.email);
          console.log("Admin user:", existingAdmin);

          if (!existingAdmin) {
            console.log("Admin does not exist, adding admin to the database");
            await createUser(user.email, user.name, user.image);
          }

          // Allow admin login
          return true;
        }

        // Regular user logic
        const existingUser = await getUserByEmail(user.email);
        console.log("Regular user:", existingUser);

        if (!existingUser) {
          console.log("User does not exist, adding user to the database");
          await createUser(user.email, user.name, user.image);
        }

        // Allow user login
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny login if any error occurs
      }
    },
  },
});
