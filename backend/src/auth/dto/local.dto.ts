import { ApiProperty } from '@nestjs/swagger';
export class LoginUserLocalDto {
  @ApiProperty({ example: 'matej@piskotki.si' })
  email: string;

  @ApiProperty({ example: 'secret' })
  password: string;
}
