import * as bycrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && bycrypt.compareSync(pass, user.password)) return user;

    return null;
  }

  async register({ email, password }: RegisterUserDto) {
    const hashedPassword = bycrypt.hashSync(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return user;
  }

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return user;
  }
}
