import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEvaluation } from './entities/productEvaluation.entity';

@Injectable()
export class ProductEvaluationService {
  constructor(
    @InjectRepository(ProductEvaluation)
    private readonly productEvaluationRepository: Repository<ProductEvaluation>, //
  ) {}
  create() {}
}
