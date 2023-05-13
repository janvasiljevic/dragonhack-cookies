import { ApiProperty } from '@nestjs/swagger';

export class CreateBookISBNDto {
  @ApiProperty({ example: '9780316029186' })
  isbn: string;
}
