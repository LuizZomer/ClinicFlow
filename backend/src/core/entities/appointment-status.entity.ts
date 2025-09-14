import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointment_status')
export class AppointmentStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;
}
