import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from '../productDetail/entities/productDetail.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepositoty: Repository<Product>,

    @InjectRepository(ProductDetail)
    private readonly productDetailRepository: Repository<ProductDetail>,

    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    const result = await this.productRepositoty.find({
      relations: [
        'productDetail',
        'productCategory',
        'productTag',
        'productEvaluation',
      ],
    });
    console.log(result);
    return result;
  }

  async find({ productId }) {
    return await this.productRepositoty.findOne({
      where: { id: productId },
      relations: [
        'productDetail',
        'productCategory',
        'productTag',
        'productEvaluation',
      ],
    });
  }

  async create({ createProductInput }) {
    const { productDetail, productCategoryId, productTag, ...product } =
      createProductInput;
    const productD = await this.productDetailRepository.save({
      ...productDetail,
    });
    const productT = [];
    for (let i = 0; i < productTag.length; i++) {
      const tagname = productTag[i].replace('#', '');
      const Tag = await this.productTagRepository.findOne({
        where: { tagName: tagname },
      });
      if (Tag) {
        productT.push(Tag);
      } else {
        await this.productTagRepository.save({ tagName: tagname });
        productT.push(tagname);
      }
    }
    // console.log(productT);

    // return await this.productRepositoty.save({
    //   ...product,
    //   productDetail: productD,
    //   productCategory: { id: productCategoryId },
    //   productTag: productT,
    // });
    // console.log('1111111111111111');
    const aaa = await this.productRepositoty.save({
      ...product,
      productDetail: productD,
      productCategory: { id: productCategoryId },
      productTag: productT,
    });
    console.log('1111111111111111');
    console.log(aaa);
    console.log('22222222222222222');
    return aaa;
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
