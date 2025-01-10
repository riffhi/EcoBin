// import {integer, varchar, pgTable, serial, text, timestamp,jsonb, boolean, point} from 'drizzle-orm/pg-core'
// import { User } from 'lucide-react'

// //here pgTable is a function that takes two arguments, table name and schema
// export const Users = pgTable('Users',{
//     id: serial('id').primaryKey(),
//     email: varchar('email',{length:255}).notNull().unique(),
//     name: varchar('name',{length:255}).notNull(),
//     createdAt: timestamp('created_at').notNull().defaultNow(),
//     image: text('image'),
//     points: integer('points').notNull().default(0),
// }) // table name & user schema


// export const Report = pgTable('report',{
//     id: serial('id').primaryKey(),
//     userID: integer('user_id').references(()=> Users.id).notNull(), // foreign key and reference to Users table
//     location: text('location').notNull(),   // location of the report
//     // wasteType: varchar('waste_type',{length:255}).notNull(), // type of waste  also wasteType is a variable of type varchar
//     // amount: integer('amount').notNull(), // amount of waste 
//     imageUrl: varchar('image_url',{length:1024}).notNull(), // image url of the report
//     // verificationResult: jsonb('verification_result'), // verification result & jsonb is a variable of type jsonb i.e. jsonb data type stores in bimary and is immutable & can work faster 
//     status: varchar('status',{length:255}).notNull().default('pending'), // status of the report
//     createdAt: timestamp('created_at').notNull().defaultNow(), // created at timestamp
//     // collectorID: integer('collector_id').references(()=> Users.id), // foreign key and reference to Users table

// })


// export const Rewards = pgTable('rewards',{ 
//     id: serial('id').primaryKey(),
//     userID: integer('user_id').references(()=> Users.id).notNull(), // foreign key and reference to Users table
//     points: integer('points').notNull(), // points of the user
//     createdAt: timestamp('created_at').notNull().defaultNow(), // created at timestamp
//     updatedAt: timestamp('updated_at').notNull().defaultNow(), // updated at timestamp
//     isAvailable: boolean('is_available').notNull().default(true), // is available boolean   
//     description: text('description'), // description of the reward
//     name: varchar('name',{length:255}).notNull(), // name of the reward
//     collectionInfo: text('collection_info'), // collection info of the reward
// })


// export const CollectedWaste = pgTable('collected_waste',{
//     id: serial('id').primaryKey(),
//    reportId: integer("report_id").references(()=> Report.id).notNull(), // foreign key and reference to Report table    
//    collectorID: integer('collector_id').references(()=> Users.id).notNull(), // foreign key and reference to Users table
//    collectionDate: timestamp('collection_date').notNull(), // collection date timestamp
//    status: varchar('status',{length:255}).notNull().default('collected'), // status of the collected waste
   
// })


// export const Notifications = pgTable('notifications',{ 
//     id: serial('id').primaryKey(), 
//     userID: integer('user_id').references(()=> Users.id).notNull(), // foreign key and reference to Users table
//     message: text('message').notNull(), // message of the notification
//     type: varchar('type',{length:255}).notNull(), // type of the notification
//     isRead: boolean('is_read').notNull().default(false), // is read boolean
//     createdAt: timestamp('created_at').notNull().defaultNow(), // created at timestamp
// })


// export const Transactions = pgTable('transactions',{
//     id: serial('id').primaryKey(),
//     userID: integer('user_id').references(()=> Users.id).notNull(), // foreign key and reference to Users table
//     type: varchar('type',{length:20}).notNull(), // type of the transaction
//     amount: integer('amount').notNull(), // amount of the transaction
//     description: text('descriptions').notNull(), // creations of the transaction
//     date: timestamp('date').notNull().defaultNow(), // date of the transaction
// })

 
// export const Blogs = pgTable('blogs',{
//     id: serial('id').primaryKey(),
//     userId: integer('user_id').references(() => Users.id),
//     title: varchar('title',{length:255}).notNull(),
//     content: text('content').notNull(),
//     imageUrl: varchar('image_url',{length:1024}).notNull(),
//     createdAt: timestamp('created_at').notNull().defaultNow(),
// });
 




import { pgTable, serial, text, integer, timestamp, boolean, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const Users = pgTable('Users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').notNull().default('now()'),
    image: text('image'),
    points: integer('points').notNull().default(0),
});

export const Reports = pgTable('reports', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => Users.id),
    location: text('location').notNull(),
    imageUrl: varchar('image_url', { length: 255 }).notNull(),
    status: varchar('status', { length: 255 }).notNull().default('pending'),
    createdAt: timestamp('created_at').notNull().default('now()'),
});

export const Rewards = pgTable('rewards', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => Users.id),
    points: integer('points').notNull(),
    createdAt: timestamp('created_at').notNull().default('now()'),
    updatedAt: timestamp('updated_at').notNull().default('now()'),
    isAvailable: boolean('is_available').notNull().default(true),
    description: text('description').notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    collectionInfo: text('collection_info'),
});

export const Transactions = pgTable('transactions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => Users.id),
    type: varchar('type', { length: 255 }).notNull(),
    amount: integer('amount').notNull(),
    description: text('description').notNull(),
    date: timestamp('date').notNull().defaultNow(),
    rewardId: integer('reward_id').notNull().references(() => Rewards.id),
    points: integer('points').notNull(),
});

export const Notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => Users.id),
    message: text('message').notNull(),
    type: varchar('type', { length: 255 }).notNull(),
    isRead: boolean('is_read').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
export const Blogs = pgTable('blogs',{
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => Users.id),
    title: varchar('title',{length:255}).notNull(),
    content: text('content').notNull(),
    imageUrl: varchar('image_url',{length:1024}).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const UsersRelations = relations(Users, ({ many }) => ({
    blogs: many(Blogs),
    reports: many(Reports), 
    rewards: many(Rewards),
    transactions: many(Transactions),
    notifications: many(Notifications),
}));

export const blogsRelations = relations(Blogs, ({ one }) => ({
    author: one(Users, {
        fields: [Blogs.userId],
        references: [Users.id],
    }),
}));

export const reportsRelations = relations(Reports, ({ one }) => ({
    user: one(Users, {
        fields: [Reports.userId],
        references: [Users.id],
    }),
}));

export const rewardsRelations = relations(Rewards, ({ one }) => ({
    user: one(Users, {
        fields: [Rewards.userId],
        references: [Users.id],
    }),
}));

export const transactionsRelations = relations(Transactions, ({ one }) => ({
    user: one(Users, {
        fields: [Transactions.userId],
        references: [Users.id],
    }),
    reward: one(Rewards, {
        fields: [Transactions.rewardId],
        references: [Rewards.id],
    }),
}));

export const notificationsRelations = relations(Notifications, ({ one }) => ({
    user: one(Users, {
        fields: [Notifications.userId],
        references: [Users.id],
    }),
}));



