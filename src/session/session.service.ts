// session.service.ts
import { HttpException, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('login')
  async login(loginBody: LoginDTO) {
    const { email } = loginBody;

    const foundUser: User | null = await this.userRepository.findOne({
      where: { email },
    });
    
    if (!foundUser) throw new HttpException('Invalid credentials', 401);

    const comparePassword = await compare(
      loginBody.password,
      foundUser.password,
    );
    if (!comparePassword) throw new HttpException('Invalid credentials', 401);

    const token: string = sign(
      { email: foundUser.email, userId: foundUser.id },
      process.env.SECRET_KEY!,
      { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! },
    );
    return { token, userId: foundUser.id };
  }
}
