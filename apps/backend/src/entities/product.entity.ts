import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, Min } from 'class-validator';

@Entity({ name: 'products' })
@Check(`"price" > 0`)
@Check(`"quantity" >= 0`)
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  article!: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  name!: string;

  @Column({ type: 'int' })
  @Min(1)
  price!: number;

  @Column({ type: 'int' })
  @Min(0)
  quantity!: number;

  @CreateDateColumn()
  created_at!: Date;
}
