'use server'
import {eq} from 'drizzle-orm'
import {db} from './dbconfig';
import {Users} from './schema';
import {Reports} from './schema';
import {eg,sql,and,desc} from 'drizzle-orm'
// import { desc } from 'drizzle-orm';


export async function createUser(email, name,image){
    try{
        const [user] = await db.insert(Users).values({email, name,image}).returning().execute();
        return user;
        }catch(error){
            console.error("Error creating user",error);
            return null 
        }
    }



      // export const createReport = async (email, location, imageURL) => {
      //   console.log("Email", email);
      //   console.log("Location:", location);
      //   // console.log("File:", imageURL);

      //   const user = await getUserByEmail(email);
      //   if (!user) {
      //     console.error("User not found");
      //     return;
      //   }
      //   console.log(user[0])
      //   const userID = user[0].id;
       
      //   console.log("creating report", userID, location, imageURL);
      //   const report = await db
      //     .insert(Report)
      //     .values({ userID, location, imageUrl: "hello"})
      //     // .returning()
      //     // .execute();


      //   await incrementUserPoints(userID, 10);
      
      
      // }

      // export const incrementUserPoints = async (userId, points) => {
      //   console.log("Incrementing points for user", userId, points);
      //   const user = await db.select().from(Users).where(eq(Users.id, userId)).limit(1);
      //   console.log(user);
      //   if (!user) {
      //     console.error("User not found");
      //     return;
      //   }
      //   // export const updateTodo = async (author_id, task_id, done) => {
      //   //   const data = await db
      //   //     .update(todo)
      //   //     .set({ done: done })
      //   //     .where(eq(todo.authorId, author_id))
      //   //     .where(eq(todo.id, task_id))
      //   //     .returning();
      //   //   return data;
      //   // };
      //   const updatedPoints = user[0].points + points;
      //   console.log("Updated points", updatedPoints);
      //  await db.update(Users).set({points:updatedPoints}).where(eq(Users.id, userId)).execute();
        
      // }


// /lib/action.js

// action.js

// action.js

// import { db } from './db';  // Make sure to import your db client correctly

export const getUserByEmail = async (email) => {
  console.log("fetching user by email", email);
  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.email, email))
    .limit(1);
  return user;
};


// In your action.js
export const createReport = async (email, location, imageURL) => {
  console.log("Email:", email);
  console.log("Location:", location);
  console.log("Image URL:", imageURL);

  // Fetch the user by email
  const user = await getUserByEmail(email);
  if (!user) {
    console.error("User not found");
    return;
  }

  console.log("User found:", user);

  const userID = user[0].id; // Assuming 'id' is the column for user ID

  // Creating the report
  try {
    console.log("Creating report for userID:", userID, "Location:", location, "Image URL:", imageURL);
    const report = await db
      .insert(Report) // Assuming you have a Report table
      .values({ userID, location, imageUrl: imageURL })
      .returning();

    // Increment points after creating the report
    await incrementUserPoints(userID, 10); // Adding 10 points to the user

    console.log("Report created successfully and points incremented.");
  } catch (error) {
    console.error("Error creating report:", error);
  }
};

export const incrementUserPoints = async (email, points) => {
  console.log("Incrementing points for user:", email, points);
  const user = await getUserByEmail(email);
  if (!user) {
    console.error("User not found");
    return;
  }

  console.log("User found:", user);

  const userID = user[0].id;
  // Fetch current user points
  // const founduser = await db.select().from(Users).where(eq(Users.id, userID)).limit(1);
  if (!user || user.length === 0) {
    console.error("User not found for points update");
    return;
  }

  const currentPoints = user[0].points || 0;
  const updatedPoints = currentPoints + points;

  // Update the user's points
  try {
    console.log("Updating user points to:", updatedPoints, "for user:", userID);
    await db.update(Users)
  .set({ points: updatedPoints })
  .where(eq(Users.id, userID));

    console.log("User points updated to:", updatedPoints);
  
  } catch (error) {
    console.error("Error updating user points:", error);
  }
};


export const getRanking = async () => {
  console.log("Fetching user ranking");

  // Fetch users by points in descending order
  const users = await db.select().from(Users).orderBy(desc(Users.points));
  console.log("Users by ranking:", users);
  return users;

};


// Your database methods here 
