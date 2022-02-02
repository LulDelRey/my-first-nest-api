import { Test, TestingModule } from '@nestjs/testing';
import Product from './product.model';
import ProductService from './products.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);

    service.addProduct('Example title', 'Example desc', 10);
    service.addProduct('Example 2 title', 'Example 2 desc', 20);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('READ', () => {

    it('should get all products', () => {
      expect(service.getAllProducts()).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({
          products: expect.any(Array)
        })
      })
    });

    it('should get a single product', () => {
      const correctId: string = '0';
      const wrongId: string = '999';

      expect(service.getProductById(correctId)).toStrictEqual({
        status: 200,
        message: expect.any(String),
        payload: expect.objectContaining({
          product: expect.objectContaining({
            id: correctId,
            title: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
          })
        })
      })

      expect(service.getProductById(wrongId)).toStrictEqual({
        status: 404,
        message: expect.any(String),
        payload: expect.objectContaining({})
      })
    });
  });

  describe('CREATE', () => {
    it('should create a product', () => {
      const title: string = 'Title';
      const desc: string = 'Desc';
      const price: number = 100;

      expect(service.getAllProducts().payload.products.length).toStrictEqual(2);
      expect(service.addProduct(title, desc, price)).toStrictEqual({
        status: 201,
        message: expect.any(String),
        payload: expect.objectContaining({
          id: expect.any(String),
        })
      })
      expect(service.getAllProducts().payload.products.length).toStrictEqual(3);
    });
  })

  describe('UPDATE', () => {
    it('should update title', () => {
      const id: string = '0';
      const beforeTitle: string = 'Example title';
      const afterTitle: string = 'New title';

      const beforeProduct: Product = service.getProductById(id).payload.product;
      expect(beforeProduct.getTitle()).toStrictEqual(beforeTitle);

      const afterProduct: Product = service.updateProduct(id, afterTitle, undefined, undefined).payload.product;
      expect(afterProduct.getTitle()).toStrictEqual(afterTitle)
      expect(afterProduct.getDescription()).toStrictEqual(beforeProduct.getDescription())
      expect(afterProduct.getPrice()).toStrictEqual(beforeProduct.getPrice())
    });

    it('should update description', () => {
      const id: string = '0';
      const beforeDesc: string = 'Example desc';
      const afterDesc: string = 'New desc';

      const beforeProduct: Product = service.getProductById(id).payload.product;
      expect(beforeProduct.getDescription()).toStrictEqual(beforeDesc);

      const afterProduct: Product = service.updateProduct(id, undefined, afterDesc, undefined).payload.product;
      expect(afterProduct.getTitle()).toStrictEqual(beforeProduct.getTitle())
      expect(afterProduct.getDescription()).toStrictEqual(afterDesc)
      expect(afterProduct.getPrice()).toStrictEqual(beforeProduct.getPrice())
    });

    it('should update price', () => {
      const id: string = '0';
      const beforePrice: number = 10;
      const afterPrice: number = 99;

      const beforeProduct: Product = service.getProductById(id).payload.product;
      expect(beforeProduct.getPrice()).toStrictEqual(beforePrice);

      const afterProduct: Product = service.updateProduct(id, undefined, undefined, afterPrice).payload.product;
      expect(afterProduct.getTitle()).toStrictEqual(beforeProduct.getTitle())
      expect(afterProduct.getDescription()).toStrictEqual(beforeProduct.getDescription())
      expect(afterProduct.getPrice()).toStrictEqual(afterPrice)
    });

    it('should not update inexistent product', () => {
      const id: string = '99';
      const title: string = 'Title';
      const desc: string = 'Desc';
      const price: number = 100;

      expect(service.updateProduct(id, title, desc, price)).toStrictEqual({
        status: 404,
        message: expect.any(String),
        payload: expect.objectContaining({})
      })
    });
  })

  describe('DELETE', () => {
    it('should delete a product', () => {
      const id: string = '0';
  
      expect(service.getAllProducts().payload.products.length).toStrictEqual(2);
      expect(service.deleteProduct(id)).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({ id })
      });
      expect(service.getAllProducts().payload.products.length).toStrictEqual(1);
    });

    it('should not delete an inexistent product', () => {
      const id: string = '99';
  
      expect(service.getAllProducts().payload.products.length).toStrictEqual(2);
      expect(service.deleteProduct(id)).toStrictEqual({
        status: 404,
        message: expect.any(String),
        payload: expect.objectContaining({})
      });
      expect(service.getAllProducts().payload.products.length).toStrictEqual(2);
    });
  })

});
