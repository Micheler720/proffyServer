import { getRepository } from 'typeorm';
import User from '../models/Users';

interface Request{
  userId: String;
}
class CreateConnetionUser {
  public async execute(userId: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not encontrated ');
    }
    user.connections += 1;
    await userRepository.update({ id: user.id }, {
      connections: user.connections,
    });
    const userUpdated = await userRepository.findOne({ where: { id: userId } });
    return userUpdated as User;
  }
}
export default CreateConnetionUser;
