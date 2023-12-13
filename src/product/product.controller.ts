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

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  // get all products
  @Get()
  async getAllProduct() {
    return this.productService.findAllProducts();
  }
  // create a new product
  @Post()
  async createProduct(@Body() createProduct: CreateProductDto) {
    return this.productService.creataProduct(createProduct);
  }
  // singleproduct
  @Get('/:id')
  async getSingleProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getSingleProduct(id);
  }
  //updateproduct
  @Patch('/:id')
  async updateProduct(
    @Body() updateProd: UpdateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.updateProduct(id, updateProd);
  }
  @Post('/checkout')
  async checkout(@Body() checkoout: checkoutDto) {
    return this.productService.checkout(checkoout);
  }
}
