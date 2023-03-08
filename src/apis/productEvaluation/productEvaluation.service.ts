import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductEvaluation } from './entities/productEvaluation.entity';

@Injectable()
export class ProductEvaluationService {
  constructor(
    @InjectRepository(ProductEvaluation)
    private readonly productEvaluationRepository: Repository<ProductEvaluation>, //

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create({ createProductEvaluationInput }) {
    const product = await this.productRepository.findOne({
      where: { id: createProductEvaluationInput.productId },
    });
    return await this.productEvaluationRepository.save({
      ...createProductEvaluationInput,
      product: product,
    });
  }
}
