import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from '../productDetail/entities/productDetail.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetail, ProductTag])],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
