import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
