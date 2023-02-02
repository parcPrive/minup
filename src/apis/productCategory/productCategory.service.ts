import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async findOne({ productCategoryId }) {
    return await this.productCategoryRepository.findOne({
      where: { id: productCategoryId },
    });
  }

  async findAll() {
    return await this.productCategoryRepository.find();
  }

  async create({ name }) {
    return await this.productCategoryRepository.save({ name });
  }

  async delete({ productId }) {
    const productcategory = await this.productCategoryRepository.findOne({
      where: { id: productId },
    });
    await this.productCategoryRepository.delete({ id: productId });
    return productcategory.name + '삭제완료';
  }
}
