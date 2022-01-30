import { Injectable } from '@nestjs/common';
import Product from './product.model';

@Injectable()
export default class ProductsService {
  private idCounter: number = 0;
  private products: Product[] = [];

  getIdCounter(): string {
    return this.idCounter.toString();
  }

  setIdCounter(idCounter: number): void {
    this.idCounter = idCounter;
  }

  getProductById(productId: string): { status: number, message: string, payload: { product?: Product } } {
    const product: Product = this.products.find((elem) => elem.getId() === productId);

    if (!product) {
      return { status: 404, message: 'Product not found!', payload: {} }
    }
    return { status: 200, message: 'Product found!', payload: { product } };
  }

  getAllProducts(): { status: number, message: string, payload: { products: Product[] } } {
    return { status: 200, message: 'Query executed!', payload: { products: [...this.products] } }
  }

  addProduct(title: string, description: string, price: number): { status: number, message: string, payload: { id: string } } {
    const productId: string = this.getIdCounter();
    const product = new Product(productId, title, description, price);
    this.products.push(product);

    this.setIdCounter(this.idCounter + 1);

    return { status: 201, message: 'Product added!', payload: { id: productId } }
  }

  updateProduct(productId: string, title: string, description: string, price: number): { status: number, message: string, payload: { product?: Product } } {
    const product: Product = this.products.find((elem) => elem.getId() === productId);
    if (!product) {
      return { status: 404, message: 'Product not found!', payload: {} }
    }

    // this feels wrong, should not be updating the state directly
    // specialy with no calidation :woozy face
    if (title) product.setTitle(title);
    if (description) product.setDescription(description);
    if (price) product.setPrice(price);

    return { status: 200, message: 'Product found!', payload: { product } };
  }

  deleteProduct(productId: string): { status: number, message: string, payload: {} } {
    const product: Product = this.products.find((elem) => elem.getId() === productId);
    if (!product) {
      return { status: 404, message: 'Product not found!', payload: {} }
    }

    this.products = this.products.filter((elem) => elem.getId() !== productId);

    return { status: 204, message: 'Product deleted!', payload: {} }
  }
}
