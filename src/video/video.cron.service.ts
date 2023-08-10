import { Injectable } from '@nestjs/common';
import { Cron } from 'nestjs-schedule';
import { Video } from 'src/entity/video.entity';
import { config } from 'dotenv';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

config();

@Injectable()
export class VideoCronService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  @Cron('0 */2 * * *')
  async handleCronToPopulateVideo() {
    const videoIdList = await this.fetchMostPopularVideoIds();
    await this.fetchAndStoreVideoDetails(videoIdList);
  }

  private async fetchMostPopularVideoIds(
    pageToken: string = '',
  ): Promise<string[]> {
    const params: any = {
      key: process.env.YOUTUBE_API_KEY,
      chart: 'mostPopular',
      regionCode: 'IN',
    };

    if (pageToken != '' && pageToken) {
      params.pageToken = pageToken;
    }

    const videoList = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: params,
      },
    );

    const nextPageToken = videoList?.data?.nextPageToken;

    const pageVideoIdList = videoList?.data?.items.map(
      (video: any) => video.id,
    );

    if (nextPageToken) {
      return pageVideoIdList.concat(
        await this.fetchMostPopularVideoIds(nextPageToken),
      );
    } else {
      return pageVideoIdList;
    }
  }

  async fetchAndStoreVideoDetails(videoIdsList: string[]): Promise<void> {
    for (const id of videoIdsList) {
      const existingVideo = await this.videoRepository.findOne({
        where: { videoId: id },
      });

      if (!existingVideo) {
        const videoDetail = await this.fetchVideoDetail(id);
        if (videoDetail) {
          const video = this.createVideoEntityFromDetail(id, videoDetail);
          await this.videoRepository.save(video);
        }
      }
    }
  }

  private async fetchVideoDetail(id: string): Promise<any | undefined> {
    const params: any = {
      key: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      id: id,
    };

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        params: params,
      },
    );

    return response?.data?.items[0];
  }

  private createVideoEntityFromDetail(id: string, videoDetail: any): Video {
    const video = new Video();
    video.title = videoDetail?.snippet?.title;
    video.description = videoDetail?.snippet?.description;
    video.thumbnailUrl = videoDetail?.snippet?.thumbnails?.medium?.url;
    video.videoId = id;
    video.publishedAt = videoDetail?.snippet?.publishedAt;
    video.videoUrl = `https://www.youtube.com/watch?v=${id}`;
    return video;
  }
}
