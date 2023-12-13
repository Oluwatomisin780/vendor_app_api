import { Prisma } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class checkoutDto {
  @IsNumber()
  @ApiProperty()
  quantity: number;
  @IsNumber()
  @ApiProperty()
  unitprice: number;
  @IsNumber()
  @ApiProperty()
  totalAmount: number;
  @IsArray()
  @ApiProperty()
  product: Product[];
}

export class Product implements Prisma.ProductUncheckedCreateInput {
  @IsNumber()
  vendor_id: number;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
