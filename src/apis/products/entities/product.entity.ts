import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // category

  // productTag

  // productCart
}
