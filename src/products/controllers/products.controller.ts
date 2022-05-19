import {
  Controller,
  Get, HttpCode, HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ProductsService } from './../services/products.service';
import { Product } from '../entities/product.entity';
import { ParseStringPipe } from '../../common/parse-string.pipe';
import {ApiImplicitQuery} from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  @ApiOkResponse({
    description: 'List of products',
    isArray: true,
    type: Product,
  })
  @ApiNoContentResponse({
    description: 'No products found',
    content: {},
    status: 204,
  })
  @ApiBadRequestResponse({
    isArray: false,
    description: 'Invalid query',
    status: 400,
    content: {},
  })
  @ApiImplicitQuery({
    name: 'id',
    required: false,
    type: String,
  })
  @ApiImplicitQuery({
    name: 'searchText',
    required: false,
    type: String,
  })
  async getProducts(
    @Query('id', ParseStringPipe) id?: string,
    @Query('searchText', ParseStringPipe) searchText?: string,
  ) {
    return await this.productsService.findAll({ searchText, id });
  }
}
