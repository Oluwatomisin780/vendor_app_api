import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignUpUser {
  @IsEmail()
  @ApiProperty()
  email: string;
  @IsString()
  @ApiProperty()
  userName: string;
  @IsString()
  @ApiProperty()
  password: string;
}
export class LoginIn {
  @IsEmail()
  @ApiProperty()
  email?: string;
  @IsString()
  @ApiProperty()
  userName?: string;
  @IsString()
  @ApiProperty()
  password: string;
}
