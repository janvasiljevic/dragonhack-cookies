import { User } from './user';
import { ApiProperty } from '@nestjs/swagger';

export class Achievement {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  points: number;

  @ApiProperty({ isArray: true, type: () => User })
  User: User[];
}
