import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginIn, SignUpUser } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  //createUser
  async signupUser(signUser: SignUpUser) {
    signUser.password = await bcrypt.hash(signUser.password, 12);
    const user = await this.prismaService.user.create({
      data: {
        ...signUser,
      },
    });
    const token = jwt.sign(
      {
        name: signUser.userName,
        id: user.id,
      },
      process.env.JSON_SECRET,
      { expiresIn: 360000 },
    );
    return { user, token };
  }
  //loginUser
  async loginUser(loginUser: LoginIn) {
    const emailLogin = await this.prismaService.user.findUnique({
      where: {
        email: loginUser.email,
      },
    });
    const userNameLogin = await this.prismaService.user.findUnique({
      where: {
        userName: loginUser.userName,
      },
    });

    if (!userNameLogin || !emailLogin) throw new NotFoundException();
    const isMatch = await bcrypt.compare(
      loginUser.password,
      userNameLogin.password,
    );
    if (!isMatch) throw new BadRequestException();
    const token = jwt.sign(
      {
        name: userNameLogin.userName || emailLogin.userName,
        id: userNameLogin.id || emailLogin.id,
      },
      process.env.JSON_SECRET,
      { expiresIn: 360000 },
    );
    return {
      userName: userNameLogin.userName || emailLogin.userName,
      id: userNameLogin.id || emailLogin.id,
      token,
    };
  }
}
