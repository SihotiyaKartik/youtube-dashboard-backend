import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserWatchLaterVideo } from './user.watch.later.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publishedAt: string;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;

  @OneToMany(() => UserWatchLaterVideo, (watchLater) => watchLater.video)
  usersWatchLater: UserWatchLaterVideo[];
}
