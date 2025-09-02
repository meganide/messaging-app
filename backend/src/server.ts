import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/trpc';

const PORT = 8000 as const;

function startServer() {
  const app = express();

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
  app.use(cookieParser());

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}

startServer();