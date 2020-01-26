import { Character } from '../models/character.interface';
import { ForbiddenException } from '@nestjs/common';

export class RepeatCharacterException extends ForbiddenException {
  constructor({ id, name }: Character) {
    const msg = `The Character: ${id} - ${name} is repeated`;
    super(msg);
  }
}
