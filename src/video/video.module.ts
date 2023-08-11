import { Video } from 'src/entity/video.entity';
import { User } from 'src/entity/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoCronService } from './video.cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [VideoController],
  providers: [VideoService, VideoCronService],
})
export class VideoModule {}
