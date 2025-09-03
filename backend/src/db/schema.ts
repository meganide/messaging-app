import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const threadsTable = pgTable("threads", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const threadParticipantsTable = pgTable("thread_participants", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  threadId: integer()
    .notNull()
    .references(() => threadsTable.id, { onDelete: "cascade" }),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  joinedAt: timestamp().defaultNow().notNull(),
});

export const messagesTable = pgTable("messages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  threadId: integer()
    .notNull()
    .references(() => threadsTable.id, { onDelete: "cascade" }),
  senderId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  content: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  threadParticipants: many(threadParticipantsTable),
  messages: many(messagesTable),
}));

export const threadsRelations = relations(threadsTable, ({ many }) => ({
  participants: many(threadParticipantsTable),
  messages: many(messagesTable),
}));

export const threadParticipantsRelations = relations(
  threadParticipantsTable,
  ({ one }) => ({
    thread: one(threadsTable, {
      fields: [threadParticipantsTable.threadId],
      references: [threadsTable.id],
    }),
    user: one(usersTable, {
      fields: [threadParticipantsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const messagesRelations = relations(messagesTable, ({ one }) => ({
  thread: one(threadsTable, {
    fields: [messagesTable.threadId],
    references: [threadsTable.id],
  }),
  sender: one(usersTable, {
    fields: [messagesTable.senderId],
    references: [usersTable.id],
  }),
}));
