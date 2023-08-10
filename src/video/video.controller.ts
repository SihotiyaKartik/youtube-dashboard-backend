import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from 'src/entity/video.entity';
import { SearchVideoDto } from './search.video.dto';

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
    return await this.videoService.findVideoById(id);
  }

  @Post('title')
  @UsePipes(new ValidationPipe())
  async getVideoByTitle(@Body() videoDto: SearchVideoDto): Promise<Video[]> {
    const { title } = videoDto;
    return await this.videoService.findVideoByTitle(title);
  }
}
