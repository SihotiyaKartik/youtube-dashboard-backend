import { Controller, Get } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoCronService } from './video.cron.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoCronService: VideoCronService) {}
}
