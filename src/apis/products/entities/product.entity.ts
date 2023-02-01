import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategory/entities/productCategory.entity';
import { ProductEvaluation } from 'src/apis/productEvaluation/entities/productEvaluation.entity';
import { ProductTag } from 'src/apis/productTag/entities/productTag.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
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
  size: string;

  @Column()
  @Field(() => String)
  brand: string;

  @Column()
  @Field(() => String)
  color: string;

  @Column()
  @Field(() => Int)
  stock: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  prdocutCategory: ProductCategory;

  @OneToMany(
    () => ProductEvaluation,
    (productEvaluation) => productEvaluation.product,
  )
  @Field(() => ProductEvaluation, { nullable: true })
  productEvaluation: ProductEvaluation;

  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  @Field(() => [ProductTag])
  productTag: ProductTag[];

  // productCart
}
