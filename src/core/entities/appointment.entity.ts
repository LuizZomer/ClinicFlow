import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'user_id', unsigned: true, type: 'integer' })
  userId: number;

  @Column({ name: 'professional_id', unsigned: true, type: 'integer' })
  professionalId: number;

  @Column({ name: 'date', type: 'timestamp' })
  date: Date;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
