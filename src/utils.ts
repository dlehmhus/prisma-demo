import { verify } from "jsonwebtoken";
import { Context } from "./types";
import { hash } from "bcrypt";

export const APP_SECRET = "fooBarBaz";
export const SALT_ROUNDS = 10;

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, APP_SECRET) as Token;
    return verifiedToken && verifiedToken.userId;
  }
}

export async function hashPassword(password: string) {
  return hash(password, SALT_ROUNDS);
}
