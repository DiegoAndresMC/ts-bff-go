import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/common/http/http.constants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
