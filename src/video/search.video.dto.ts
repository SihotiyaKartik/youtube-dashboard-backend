import { IsNotEmpty, IsString } from 'class-validator';

export class SearchVideoDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
