import {
  Controller,
  Get,
  Query,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from 'src/entity/video.entity';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async getAllVideos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 15,
  ): Promise<Video[]> {
    return this.videoService.getVideoWithPagination(page, limit);
  }

  @Get(':id')
  async getVideoById(@Param('id') id: number): Promise<Video> {
    const video = await this.videoService.findVideoById(id);
    return video;
  }
}
