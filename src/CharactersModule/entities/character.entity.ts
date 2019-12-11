import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16, unique: true })
  name: string;
}
