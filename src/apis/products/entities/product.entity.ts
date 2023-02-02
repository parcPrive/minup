import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductDetail } from 'src/apis/productDetail/entities/productDetail.entity';
import { ProductEvaluation } from 'src/apis/productEvaluation/entities/productEvaluation.entity';
import { ProductTag } from 'src/apis/productTag/entities/productTag.entity';

import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  productName: string;

  @Column()
  @Field(() => String)
  desc: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => String)
  brand: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductDetail)
  @Field(() => ProductDetail)
  productDetail: ProductDetail;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @OneToMany(
    () => ProductEvaluation,
    (productEvaluation) => productEvaluation.product,
  )
  @Field(() => ProductEvaluation, { nullable: true })
  productEvaluation: ProductEvaluation;

  @JoinColumn()
  @ManyToMany(() => ProductTag, (productTag) => productTag.product)
  @Field(() => [ProductTag])
  productTag: ProductTag[];

  // productCart
}
