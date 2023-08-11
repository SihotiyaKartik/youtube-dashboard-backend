import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserWatchLaterVideo } from './user.watch.later.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => UserWatchLaterVideo, (watchLater) => watchLater.user)
  watchLater: UserWatchLaterVideo[];
}
