import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";
import { BadRequest, Unauthorized } from "../utils/ApiError";
import { env } from "../config/env";

export const authService = {
  async register(email: string, password: string) {
    const exists = await userRepository.findByEmail(email);
    if (exists) throw BadRequest("Email already registered");

    const hash = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(email, hash);

    return { id: user.id, email: user.email };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw Unauthorized("Invalid credentials");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw Unauthorized("Invalid credentials");

    const secret = env.JWT_SECRET!;
    const expiresIn = env.JWT_EXPIRES_IN || "1d";

    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn,
    } as SignOptions);

    return { token };
  },
};
