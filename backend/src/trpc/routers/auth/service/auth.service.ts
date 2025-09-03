import { TRPCError } from "@trpc/server";
import { LoginInput } from "../auth.types";
import { authRepository } from "../repository/auth.repository";
import {
  COOKIE_OPTIONS,
  generateToken,
  JWT_COOKIE_NAME,
  type JwtPayload,
} from "../../../../lib/jwt";
import { Context } from "../../../trpc";

class AuthService {
  public async login(input: LoginInput, ctx: Context) {
    const user = await authRepository.findUserByEmail(input.email);

    if (!user || user.length === 0) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    if (user[0].password !== input.password) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid password",
      });
    }

    const jwtPayload: JwtPayload = {
      userId: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };

    const token = generateToken(jwtPayload);

    ctx.res.cookie(JWT_COOKIE_NAME, token, COOKIE_OPTIONS);

    return {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
    };
  }
}

export const authService = new AuthService();
