import { BaseEntity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

interface ModelProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export default abstract class Model extends BaseEntity implements ModelProps {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
