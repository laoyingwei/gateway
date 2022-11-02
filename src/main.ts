import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionsFilter } from './common/exceptions/http.exception.filter'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  // 接口版本化管理 比如 http://localhost:3000/v3/user http://localhost:3000/v2/user http://localhost:3000/v1/user  
  //访问 http://localhost:3000/user  等于访问 http://localhost:3000/v1/user
  app.enableVersioning({   
    defaultVersion: [VERSION_NEUTRAL, '1', '2','3'],
    type: VersioningType.URI
  })
  //注册全局拦截器 统一返回内容格式
  app.useGlobalInterceptors(new TransformInterceptor())

  ///注册拦截器 统一返回错误信息格式
  app.useGlobalFilters(new AllExceptionsFilter(),new HttpExceptionsFilter())
  await app.listen(3000);
}

bootstrap();
