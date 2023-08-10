import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import typeOrmConfig from './typeorm.config';
import { ScheduleModule } from 'nestjs-schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ScheduleModule.forRoot(),
    AuthModule,
    VideoModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
