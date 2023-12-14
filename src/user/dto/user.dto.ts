import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignUpUser {
  @IsEmail()
  email: string;
  @IsString()
  userName: string;
  @IsString()
  password: string;
}
export class LoginIn {
  @IsEmail()
  email?: string;
  @IsString()
  userName?: string;
  @IsString()
  password: string;
}
