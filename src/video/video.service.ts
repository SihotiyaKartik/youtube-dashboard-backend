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

  async getVideoWithPagination(page: number, limit: number): Promise<Video[]> {
    const skip = (page - 1) * limit;

    const videos = await this.videoRepository.find({
      skip: skip,
      take: limit,
    });

    return videos;
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

    if (!videos)
      throw new NotFoundException('No videos found having this title');

    return videos;
  }

  // async addToWatchLater(user: User, videoId: number): Promise<void> {
  //   const video = await this.videoRepository.findOne({
  //     where: { id: videoId },
  //   });
  //   if (!video) throw new NotFoundException('No video found for following id');
  //   if (!user?.watchLater.includes(video)) {
  //     user.watchLater.push(video);
  //     await this.userRepository.save(user);
  //   }
  // }
}
