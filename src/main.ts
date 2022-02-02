import { NestFactory } from '@nestjs/core';
import ProductModule from './Products/products.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
