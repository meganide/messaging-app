import { publicProcedure, protectedProcedure, router } from "../../trpc";
import { loginSchema } from "./auth.types";
import { authService } from "./service/auth.service";

export const authRouter = router({
    login: publicProcedure.input(loginSchema)
    .mutation(async ({ input, ctx }) => {
        return authService.login(input, ctx);        
    }),
        
    me: protectedProcedure
    .query(async ({ ctx }) => {
        return {
            user: {
                id: ctx.user.id,
                email: ctx.user.email,
            }
        };
    }),
});
    
  