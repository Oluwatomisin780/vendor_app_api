import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/createProduct.dto';
import { checkoutDto } from './dto/checkOut.dto';
import { User, UserInterface } from '../user/decorator/user.decorator';
import { Roles } from '../decorator/role.decorator';
import { UserType } from '@prisma/client';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  // get all products
  @Get()
  async getAllProduct() {
    return this.productService.findAllProducts();
  }
  // create a new product
  @Roles(UserType.VENDOR)
  @Post()
  async createProduct(
    @Body() createProduct: CreateProductDto,
    @User() user: UserInterface,
  ) {
    return this.productService.creataProduct(createProduct, user.id);
  }
  // singleproduct
  @Get('/:id')
  async getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getSingleProduct(id);
  }
  //updateproduct
  @Roles(UserType.VENDOR)
  @Patch('/:id')
  async updateProduct(
    @Body() updateProd: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.updateProduct(id, updateProd);
  }
  //checkout
  @Roles(UserType.BUYER)
  @Post('/checkout')
  async checkout(@Body() checkoout: checkoutDto, @User() user: UserInterface) {
    return this.productService.checkout(checkoout, user.id);
  }
}
