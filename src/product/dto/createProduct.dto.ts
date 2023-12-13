import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, isNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
  // @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price?: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  quantity?: number;
}
