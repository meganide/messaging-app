import { userRepository } from "../repository/user.repository";

class UserService {
  public async getUserId(username: string) {
    const user = await userRepository.findByUsername(username);
    return user[0].id;
  }
}

export const userService = new UserService();
