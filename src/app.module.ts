import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';

import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/user/user.module';

@Module({
  imports: [
    AuthModule,
    ProductCategoryModule,
    ProductModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'my-database',
      host: 'localhost',
      port: 3306,
      username: 'root',
      // password: 'root',
      password: '',
      database: 'minip',
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
