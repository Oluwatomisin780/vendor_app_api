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
  @IsString()
  vendor_id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
