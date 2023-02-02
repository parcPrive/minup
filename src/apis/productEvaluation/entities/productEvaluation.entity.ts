import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductEvaluation {
  //상품평
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  review: string;

  @Column()
  @Field(() => Int)
  grade: number;

  @Column({ default: 'uuid' })
  nickname: string;

  @ManyToOne(() => Product, (product) => product.productEvaluation)
  @Field(() => Product, { nullable: true })
  product: Product;
}
