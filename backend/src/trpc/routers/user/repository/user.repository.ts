import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { usersTable } from "../../../../db/schema";

class UserRepository {
  public async findByUsername(username: string) {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.name, username));
  }
}

export const userRepository = new UserRepository();
