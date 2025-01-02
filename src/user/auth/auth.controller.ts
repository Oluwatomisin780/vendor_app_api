import { Body, Controller, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginIn, SignUpUser } from '../dto/user.dto';
import { REQUEST } from '@nestjs/core';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //signup
  @Post('SignUp')
  async signUp(@Body() signUp: SignUpUser) {
    return this.authService.signupUser(signUp);
  }
  @Post('login')
  async loginIn(@Body() loginIn: LoginIn) {
    return this.authService.loginUser(loginIn);
  }
}
