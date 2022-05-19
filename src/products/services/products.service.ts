import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Product, Params } from './../entities/product.entity';
import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import config from '../../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  private products: Product[] = [];

  async findAll({ searchText, id }: Params) {
    const baseUrl = this.configService.API_URL;
    let findUrl = `${baseUrl}/products?`;

    if (searchText !== '' && id === '') {
      findUrl += `s=${searchText}`;
    }
    if (searchText === '' && id !== '') {
      findUrl += `id=${id}`;
    }
    if (id !== '' && searchText && searchText?.length >= 3) {
      findUrl += `s=${searchText}`;
    }
    if (
      id !== '' &&
      searchText !== '' &&
      searchText &&
      searchText?.length < 3 &&
      id &&
      id?.length >= 1
    ) {
      findUrl += `id=${id}`;
    }

    await axios
      .get(findUrl)
      .then((response) => {
        if (response.data.length > 0) {
          this.products = response.data?.map((p) => new Product(p).make());
        } else {
          this.products = [];
        }
      })
      .catch((error) => {
        this.products = [];
      });

    if (this.products.length === 0) {
      throw new HttpException('Anything, this should not be showed.', 204);
    }
    return this.products;
  }
}
