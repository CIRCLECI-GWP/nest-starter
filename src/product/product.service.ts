import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  public async createProduct(
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    return await this.productRepository.save(createProductDto);
  }

  public async getProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async getProduct(productId: number): Promise<Product> {
    return await this.productRepository.findOne({
      where: { id: productId },
    });
  }

  public async editProduct(
    productId: number,
    createProductDto: CreateProductDTO,
  ): Promise<Product> {
    const editedProduct = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!editedProduct) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.update({ id: productId }, createProductDto);
    return editedProduct;
  }

  public async deleteProduct(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
