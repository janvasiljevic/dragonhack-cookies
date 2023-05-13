import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiPropertyOptional({ type: () => User })
  User?: User;

  @ApiPropertyOptional({ type: String })
  userId?: string;
}
