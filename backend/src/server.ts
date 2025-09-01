import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/trpc';

const PORT = 8000 as const;

async function main() {
  const app = express();

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

void main();