import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'matej@piskotki.si' })
  email: string;

  @ApiProperty({ example: 'secret' })
  password: string;
}
