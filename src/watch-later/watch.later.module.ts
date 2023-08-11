import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Video } from 'src/entity/video.entity';
import { WatchLaterController } from './watch.later,controller';
import { WatchLaterService } from './watch.later.service';
import { VideoService } from 'src/video/video.service';
import { UserWatchLaterVideo } from 'src/entity/user.watch.later.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserWatchLaterVideo, User, Video])],
  controllers: [WatchLaterController],
  providers: [WatchLaterService, VideoService],
})
export class WatchLaterModule {}
