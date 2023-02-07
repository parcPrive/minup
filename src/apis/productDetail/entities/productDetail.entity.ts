import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductDetail {
  //상품평
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  size: string;

  @Column()
  @Field(() => String)
  color: string;

  @Column({ default: false })
  // @Field(() => Boolean)
  isSoldout: boolean;

  @Column()
  @Field(() => Int)
  stock: number; // 재고
}
