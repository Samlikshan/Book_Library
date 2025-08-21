import { User } from "../models/User";

export const userRepository = {
  async findByEmail(email: string) {
    return User.findOne({ email });
  },

  async createUser(email: string, passwordHash: string) {
    return User.create({ email, password: passwordHash });
  },
};
