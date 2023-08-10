import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/entity/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async getVideoWithPagination(page: number, limit: number): Promise<Video[]> {
    const skip = (page - 1) * limit;

    const videos = await this.videoRepository.find({
      skip: skip,
      take: limit,
    });

    return videos;
  }
}
