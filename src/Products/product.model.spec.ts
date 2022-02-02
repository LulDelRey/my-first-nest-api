import { Test, TestingModule } from '@nestjs/testing';
import Product from './product.model';

describe('Product model', () => {
  let product: Product;

  beforeAll(async () => {
    product = new Product('1', 'Example title', 'Example description', 100);
  });

  describe('Product', () => {
    it('should exist', () => {
      expect(product).toBeDefined();
    });
  });

  describe('Product getters', () => {
    it('should get correct Id', () => {
      expect(product.getId()).toBe('1');
    });

    it('should get correct title', () => {
      expect(product.getTitle()).toBe('Example title');
    });

    it('should get correct description', () => {
      expect(product.getDescription()).toBe('Example description');
    });

    it('should get correct price', () => {
      expect(product.getPrice()).toBe(100);
    });
  });

  describe('Product setters', () => {
    it('should set correct Id', () => {
      expect(product.getId()).toBe('1');
      product.setId('2')
      expect(product.getId()).toBe('2');
    });

    it('should set correct title', () => {
      expect(product.getTitle()).toBe('Example title');
      product.setTitle('New title');
      expect(product.getTitle()).toBe('New title');
    });

    it('should set correct description', () => {
      expect(product.getDescription()).toBe('Example description');
      product.setDescription('New description');
      expect(product.getDescription()).toBe('New description');
    });

    it('should set correct price', () => {
      expect(product.getPrice()).toBe(100);
      product.setPrice(200)
      expect(product.getPrice()).toBe(200);
    });

  });
});
