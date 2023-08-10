import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import typeOrmConfig from './typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
