'use server'
import {eq} from 'drizzle-orm'
import {db} from './dbconfig';
import {Users} from './schema';
import {Report} from './schema';
import {eg,sql,and,desc} from 'drizzle-orm'

export async function createUser(email, name,image){
    try{
        const [user] = await db.insert(Users).values({email, name,image}).returning().execute();
        return user;
        }catch(error){
            console.error("Error creating user",error);
            return null 
        }
    }

    export const getUserByEmail = async (email) => {
        console.log("fetching user by email", email);
        const user = await db
          .select()
          .from(Users)
          .where(eq(Users.email, email))
          .limit(1);
        return user;
      };


      export const createReport = async (email, location, imageURL) => {
        console.log("Email", email);
        console.log("Location:", location);
        // console.log("File:", imageURL);

        const user = await getUserByEmail(email);
        if (!user) {
          console.error("User not found");
          return;
        }
        console.log(user[0])
        const userID = user[0].id;
       
        console.log("creating report", userID, location, imageURL);
        const report = await db
          .insert(Report)
          .values({ userID, location, imageUrl: "hello"})
          // .returning()
          // .execute();


        await incrementUserPoints(userID, 10);
      
      
      }

      export const incrementUserPoints = async (userId, points) => {
        console.log("Incrementing points for user", userId, points);
        const user = await db.select().from(Users).where(eq(Users.id, userId)).limit(1);
        console.log(user);
        if (!user) {
          console.error("User not found");
          return;
        }
        // export const updateTodo = async (author_id, task_id, done) => {
        //   const data = await db
        //     .update(todo)
        //     .set({ done: done })
        //     .where(eq(todo.authorId, author_id))
        //     .where(eq(todo.id, task_id))
        //     .returning();
        //   return data;
        // };
        const updatedPoints = user[0].points + points;
        console.log("Updated points", updatedPoints);
       await db.update(Users).set({points:updatedPoints}).where(eq(Users.id, userId)).execute();
        
      }
