import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'scheduled_at', type: 'timestamp' })
  scheduledAt: Date;

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

  @RelationId((appointment: Appointment) => appointment.patient)
  patientId: number;

  @ManyToOne(() => User, (user) => user.appointmentsAsProfessional, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'professional_id' })
  professional: User;

  @RelationId((appointment: Appointment) => appointment.professional)
  professionalId: number;
}
