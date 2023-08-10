import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import typeOrmConfig from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VideoModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
