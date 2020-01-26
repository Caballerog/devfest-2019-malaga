import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCharacterDto {
  @MinLength(2)
  @MaxLength(16)
  @IsString()
  readonly name: string;
}
