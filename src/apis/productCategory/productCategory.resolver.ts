import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryService } from './productCategory.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Query(() => ProductCategory)
  fetchCategory(
    @Args('productCategoryId') productCategoryId: string, //
  ) {
    return this.productCategoryService.findOne({ productCategoryId });
  }

  @Query(() => [ProductCategory])
  fetchCategories() {
    return this.productCategoryService.findAll();
  }

  @Mutation(() => ProductCategory)
  createCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }

  @Mutation(() => String)
  deleteCategory(
    @Args('productId') productId: string, //
  ) {
    return this.productCategoryService.delete({ productId });
  }
}
