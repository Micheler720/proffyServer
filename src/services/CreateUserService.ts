import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';

interface Request {
  id?: 'uuid',
  name: string;
  surname: string;
  password: string;
  email: string;
  biografia: string;
  whatsapp: string;
}
class CreateUserService {
  public async execute({
    name, email, password, surname, biografia, whatsapp,
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
      biografia,
      whatsapp,
    });
    await userRepository.save(user);
    return user;
  }

  public async update({
    id, name, surname, biografia, whatsapp,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const userUpdate = await userRepository.findOne({ where: { id } }) as User;
    if (!userUpdate) {
      throw new Error('User not found');
    }
    userUpdate.biografia = biografia;
    userUpdate.name = name;
    // userUpdate?.password
    userUpdate.whatsapp = whatsapp;
    userUpdate.surname = surname;
    await userRepository.save(userUpdate);
    return userUpdate;
  }
}
export default CreateUserService;
