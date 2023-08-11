import {
  Controller,
  UseGuards,
  Param,
  ParseIntPipe,
  Request,
  Post,
} from '@nestjs/common';
import { VideoService } from 'src/video/video.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { WatchLaterService } from './watch.later.service';

@Controller('watch_later')
@UseGuards(JwtAuthGuard)
export class WatchLaterController {
  constructor(
    private readonly videoService: VideoService,
    private readonly watchLaterService: WatchLaterService,
  ) {}

  @Post(':videoId')
  async addVideoToWatchLater(
    @Param('videoId', ParseIntPipe) videoId: number,
    @Request() req,
  ): Promise<any> {
    const video = await this.videoService.findVideoById(videoId);
    const user = req.user;

    const watchLaterData = await this.watchLaterService.addToWatchLater(
      user,
      video,
    );

    return {
      message: 'Video added to Watch Later list.',
      watchLaterData,
    };
  }
}
