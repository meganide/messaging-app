import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
  
const db = drizzle(process.env.DATABASE_URL!);

type User = typeof usersTable.$inferInsert;

const users: User[] = [
  {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    password: '123456',
  },
  {
    name: 'Jane',
    age: 25,
    email: 'jane@example.com',
    password: '123456',
  },
  {
    name: 'Jim',
    age: 35,
    email: 'jim@example.com',
    password: '123456',
  },
  {
    name: 'Jill',
    age: 28,
    email: 'jill@example.com',
    password: '123456',
  },
  {
    name: 'Jack',
    age: 32,
    email: 'jack@example.com',
    password: '123456',
  },
] as const;

async function seedDatabase() {
  await db.insert(usersTable).values(users);
}

seedDatabase();

