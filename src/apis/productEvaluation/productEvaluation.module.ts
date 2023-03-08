import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductEvaluation } from './entities/productEvaluation.entity';
import { ProductEvaluationResolver } from './productEvaluation.resolver';
import { ProductEvaluationService } from './productEvaluation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductEvaluation]), //
  ],
  providers: [
    ProductEvaluationResolver, //
    ProductEvaluationService,
  ],
})
export class ProductEvaluationModule {}
