import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductDetailInput } from 'src/apis/productDetail/dto/productDetail.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  productName: string;

  @Field(() => String)
  desc: string;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  brand: string;

  @Field(() => ProductDetailInput)
  productDetail: ProductDetailInput;

  @Field(() => String)
  productCategoryId: string;
}
