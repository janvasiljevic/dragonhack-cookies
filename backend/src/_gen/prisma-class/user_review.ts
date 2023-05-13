import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class UserReview {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: Number })
  rating: number;

  @ApiProperty({ type: String })
  review: string;

  @ApiProperty({ type: () => User })
  author: User;

  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: () => User })
  subject: User;

  @ApiProperty({ type: String })
  subjectId: string;
}
