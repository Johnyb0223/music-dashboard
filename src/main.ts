import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search/search.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(SearchModule);
  const port = 3000;
  await app.listen(port, () => {
    console.log(`Nest application is running on: http://localhost:${port}`);
  });
}
bootstrap();
