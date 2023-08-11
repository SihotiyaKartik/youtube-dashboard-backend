import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/entity/video.entity';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getVideoWithPagination(page: number): Promise<any> {
    const limit = 10;
    const skip = (page - 1) * limit;

    const [videos, totalVideo] = await this.videoRepository
      .createQueryBuilder('video')
      .orderBy('video.id', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data: { videos: videos, totalPages: Math.ceil(totalVideo / limit) },
    };
  }

  async findVideoById(id: number): Promise<Video | undefined> {
    const video = await this.videoRepository.findOne({ where: { id: id } });
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    return video;
  }

  async findVideoByTitle(title: string): Promise<Video[] | undefined> {
    const videos = await this.videoRepository
      .createQueryBuilder('video')
      .where('LOWER(video.title) LIKE LOWER(:title)', { title: `%${title}%` })
      .getMany();

    if (!videos && videos.length === 0)
      throw new NotFoundException({
        message: 'No videos found having this title',
        data: [],
      });

    return videos;
  }
}
