import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AppointmentStatus } from './appointment-status.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  scheduledAt: Date;

  @Column({ name: 'professional_id', type: 'integer' })
  professionalId: number;

  @Column({ name: 'patient_id', type: 'integer' })
  patientId: number;

  @Column({ name: 'status_id', type: 'integer' })
  statusId: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.appointmentsAsPatient, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'patient_id' })
  patient: User;

  @ManyToOne(() => User, (user) => user.appointmentsAsProfessional, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'professional_id' })
  professional: User;

  @ManyToOne(() => AppointmentStatus, undefined, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'status_id' })
  status: AppointmentStatus;

  constructor(partial?: Partial<Appointment>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
