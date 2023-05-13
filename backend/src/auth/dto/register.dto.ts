import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ example: 'matej@piskotki.si' })
  email: string;

  @ApiProperty({ example: 'secret' })
  password: string;

  @ApiProperty({ example: 'Matej' })
  firstName: string;

  @ApiProperty({ example: 'Piskotki' })
  lastName: string;
}
