import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from '../productDetail/entities/productDetail.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositoty: Repository<Product>,

    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,
  ) {}

  async findAll() {
    const result = await this.productRepositoty.find({
      relations: ['productDetail', 'productCategory'],
    });
    console.log(result);
    return result;
  }

  async find({ productId }) {
    return await this.productRepositoty.findOne({
      where: { id: productId },
      relations: ['productDetail', 'productCategory'],
    });
  }

  async create({ createProductInput }) {
    const { productDetail, productCategoryId, ...product } = createProductInput;
    const productD = await this.productDetailRepository.save({
      ...productDetail,
    });

    return await this.productRepositoty.save({
      ...product,
      productDetail: productD,
      productCategory: { id: productCategoryId },
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
      relations: ['productDetail', 'productCategory'],
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
