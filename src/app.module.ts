import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { getConfig } from './utils/index'
@Module({
  // isGlobal:true 每个模块都导入 全局模块的意思
  imports: [ConfigModule.forRoot({ignoreEnvFile:true,isGlobal:true,load:[getConfig]}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
