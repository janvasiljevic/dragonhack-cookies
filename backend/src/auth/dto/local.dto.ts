import { ApiProperty } from '@nestjs/swagger';
export class LoginUserLocalDto {
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345678' })
  password: string;
}
