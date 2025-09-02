import z from "zod";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";

export const messageRouter = router({
    list: protectedProcedure.query(() => {
        return { message: "hello" }
    }),
    create: publicProcedure.input(z.object({
        name: z.string(),
        age: z.number(),
        email: z.string().email(),
        password: z.string(),
    })).mutation(async ({ input }) => {
        const { name, age, email, password } = input;
        await db.insert(usersTable).values({ name, age, email, password });
    }),
});
  