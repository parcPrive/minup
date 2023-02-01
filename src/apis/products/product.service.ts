import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositoty: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepositoty.find();
  }

  async find({ productId }) {
    return await this.productRepositoty.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    return await this.productRepositoty.save({
      ...createProductInput,
    });
  }

  update({ prductId, updateProductInput }) {}
}
