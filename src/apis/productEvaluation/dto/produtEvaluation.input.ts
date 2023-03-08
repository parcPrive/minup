import { Field, InputType, Int, OmitType } from '@nestjs/graphql';
import { ProductEvaluation } from '../entities/productEvaluation.entity';

@InputType()
export class CreateProductEvaluationInput {
  @Field(() => String)
  review: string;

  @Field(() => Int)
  grade: number;

  @Field(() => String)
  productId: string;
}
// export class CreateProductEvaluationInput extends OmitType(
//   ProductEvaluation,
//   ['id'],
//   InputType,
// ) {}
