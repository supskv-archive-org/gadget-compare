import { Module } from '@nestjs/common';
import { productProviders } from './product.providers';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class ProductModule {}
