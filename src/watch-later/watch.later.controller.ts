import {
  Controller,
  UseGuards,
  Param,
  ParseIntPipe,
  Request,
  Post,
  Get,
  NotFoundException,
  Delete,
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

  @Get('list')
  async getAllWatchLaterVideoForUser(@Request() req) {
    const user = req.user;

    const watchLaterVideoList =
      await this.watchLaterService.getWatchLaterVideoList(user);

    if (!watchLaterVideoList || watchLaterVideoList.length === 0) {
      throw new NotFoundException({
        message: 'No videos present in watch later',
        data: [],
      });
    }
    return { data: watchLaterVideoList };
  }

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
      data: { message: 'Video added to Watch Later list.', watchLaterData },
    };
  }

  @Delete(':videoId')
  async deleteWatchLaterVideo(
    @Param('videoId', ParseIntPipe) videoId: number,
    @Request() req,
  ) {
    const user = req.user;
    await this.watchLaterService.removeWatchLaterVideById(user, videoId);

    return {
      data: { message: 'Video successfully removed from watch later list' },
    };
  }
}
