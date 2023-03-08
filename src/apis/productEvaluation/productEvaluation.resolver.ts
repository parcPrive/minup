import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductEvaluationInput } from './dto/produtEvaluation.input';
import { ProductEvaluation } from './entities/productEvaluation.entity';
import { ProductEvaluationService } from './productEvaluation.service';

@Resolver()
export class ProductEvaluationResolver {
  constructor(
    private readonly productEvaluationService: ProductEvaluationService, //
  ) {}
  @Mutation(() => ProductEvaluation)
  Evaluation(
    @Args('createProductEvaluationInput')
    createProductEvaluationInput: CreateProductEvaluationInput, //
  ) {
    return this.productEvaluationService.create({
      createProductEvaluationInput,
    });
  }
}
