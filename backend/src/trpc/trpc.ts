import * as trpcExpress from "@trpc/server/adapters/express";
import { initTRPC, TRPCError } from "@trpc/server";
import { verifyToken, JWT_COOKIE_NAME } from "../lib/jwt";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    try {
      const token = req.cookies?.[JWT_COOKIE_NAME];

      if (!token) {
        return null;
      }

      const payload = verifyToken(token);

      return {
        id: payload.userId,
        name: payload.name,
        email: payload.email,
      };
    } catch (error) {
      return null;
    }
  };

  return {
    req,
    res,
    user: getUser(),
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected procedure that requires authentication
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // user is now guaranteed to be defined
    },
  });
});
