import { Test, TestingModule } from '@nestjs/testing';
import ProductController from './products.controller';
import ProductService from './products.service';

describe('ProductController', () => {
  let controller: ProductController;
  const mockProductService = {
    getAllProducts: jest.fn().mockImplementation(() => (
      { status: 200, message: 'Success', payload: { products: [] } }
    )),
    getProductById: jest.fn().mockImplementation((id: string) => (
      {
        status: 200, message: 'Success', payload: {
          product: {
            id, title: 'Title', description: 'Desc', price: 100,
          }
        }
      }
    )),
    addProduct: jest.fn().mockImplementation(
      (title: string, description: string, price: number) => (
        {
          status: 200, message: 'Success', payload: {
            product: {
              id: '1', title, description, price,
            }
          }
        }
      )),
    updateProduct: jest.fn().mockImplementation(
      (id: string, title: string, description: string, price: number) => (
        {
          status: 200, message: 'Success', payload: {
            product: {
              id, title, description, price,
            }
          }
        }
      )),
    deleteProduct: jest.fn().mockImplementation((id: string) => (
      { status: 200, message: 'Success', payload: { id } }
    )),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('READ', () => {
    it('should get all products', () => {
      expect(controller.getAllProducts()).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({
          products: expect.any(Array)
        })
      })
      expect(mockProductService.getAllProducts).toHaveBeenCalled();
    });

    it('should get a single product', () => {
      const id: string = '1';

      expect(controller.getOneProduct(id)).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({
          product: expect.objectContaining({
            id,
            title: expect.any(String),
            description: expect.any(String),
            price: expect.any(Number),
          })
        })
      })
      expect(mockProductService.getProductById).toHaveBeenCalledWith('1');
    });
  });

  describe('CREATE', () => {
    it('should create a product', () => {
      const title: string = 'Title';
      const desc: string = 'Desc';
      const price: number = 100;

      expect(controller.addProduct(title, desc, price)).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({
          product: expect.objectContaining({
            id: expect.any(String),
            title,
            description: desc,
            price,
          })
        })
      })
      expect(mockProductService.addProduct).toHaveBeenCalledWith(title, desc, price);
    });
  })

  describe('UPDATE', () => {
    it('should update a product', () => {
      const id: string = '1';
      const title: string = 'Title';
      const desc: string = 'Desc';
      const price: number = 100;

      expect(controller.updateProduct(id, title, desc, price)).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({
          product: expect.objectContaining({
            id,
            title,
            description: desc,
            price,
          })
        })
      })
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(id, title, desc, price);
    });
  })

  describe('DELETE', () => {
    it('should delete a product', () => {
      const id: string = '1';

      expect(controller.deleteProduct(id)).toStrictEqual({
        status: expect.any(Number),
        message: expect.any(String),
        payload: expect.objectContaining({ id })
      });
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(id);
    });
  })

});
