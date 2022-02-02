import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import Product from './product.model';
import ProductsService from './products.service';

@Controller('/products')
export default class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  getAllProducts(): { status: number, message: string, payload: { products: Product[] } } {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getOneProduct(
    @Param('id') productId: string,
  ): { status: number, message: string, payload: { product?: Product } } {
    return this.productsService.getProductById(productId);
  }

  @Post()
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { status: number, message: string, payload: { id: string } } {
    return this.productsService.addProduct(title, description, price);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): { status: number, message: string, payload: { product?: Product } } {
    return this.productsService.updateProduct(productId, title, description, price);
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') productId: string
  ): { status: number, message: string, payload: { id?: string } } {
    return this.productsService.deleteProduct(productId);
  }

}
