import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';

interface Request {
  name: string;
  surname: string;
  password: string;
  email: string;
}
class CreateUserService {
  public async execute({
    name, email, password, surname,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const checkUserExist = await userRepository.findOne({
      where: { email },
    });
    if (checkUserExist) {
      throw new Error('Email address already, used.');
    }
    const hashedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      surname,
    });
    await userRepository.save(user);
    return user;
  }
}
export default CreateUserService;
