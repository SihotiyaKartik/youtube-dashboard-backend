import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { Video } from 'src/entity/video.entity';
import { UserWatchLaterVideo } from 'src/entity/user.watch.later.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WatchLaterService {
  constructor(
    @InjectRepository(UserWatchLaterVideo)
    private readonly watchLaterRepository: Repository<UserWatchLaterVideo>,
  ) {}

  async addToWatchLater(user: User, video: Video): Promise<any> {
    const existingItem = await this.watchLaterRepository.findOne({
      where: { user, video },
    });

    if (existingItem) {
      throw new BadRequestException(
        'Video is already in the Watch Later list.',
      );
    }

    const newItem = new UserWatchLaterVideo();
    newItem.user = user;
    newItem.video = video;

    await this.watchLaterRepository.save(newItem);

    return {
      user: { id: user.id },
      video: { id: video.id },
    };
  }

  async getWatchLaterVideoList(user: User): Promise<UserWatchLaterVideo[]> {
    return await this.watchLaterRepository.find({
      where: { user },
      relations: ['video'],
    });
  }
}
