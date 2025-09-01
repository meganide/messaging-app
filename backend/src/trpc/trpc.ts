import * as trpcExpress from '@trpc/server/adapters/express';
import { initTRPC } from '@trpc/server';

export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => {
    const getUser = () => {
      if (req.headers.authorization !== 'secret') {
        return null;
      }
      return {
        name: 'alex',
      };
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



