import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

function extractUsernameFromEmail(email: string): string {
  const splitIndex = email.indexOf('@');
  if (splitIndex !== -1) {
    return email.substring(0, splitIndex);
  } else {
    throw new Error('Invalid email while extracting username from it');
  }
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.email = email;
    user.username = extractUsernameFromEmail(email);
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
}
