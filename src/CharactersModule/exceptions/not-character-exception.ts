import { NotFoundException } from '@nestjs/common';

export class NotCharacterException extends NotFoundException {
  constructor(characterID: number) {
    const msg = `The Character: ID - ${characterID} not found`;
    super(msg);
  }
}
