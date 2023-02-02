import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

  async update({ productId, updateProductInput }) {
    const product = await this.productRepositoty.findOne({
      where: { id: productId },
    });
    // const newProduct = {
    //   ...product,
    //   ...updateProductInput,
    // };
    return await this.productRepositoty.save({
      ...product,
      ...updateProductInput,
    });
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepositoty.findOne({
      where: { id: productId },
    });
    if (product.productDetail.isSoldout) {
      throw new UnprocessableEntityException('이미 판매되었습니다.');
    }
  }

  async delete({ productId }) {
    const result = await this.productRepositoty.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
