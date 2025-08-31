import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProfessionalAttributes } from './professional-attributes.entity';
import { DayOfWeek } from 'src/shared/types/enum/day-of-week.enum';

@Entity('professional_availiable_hours')
export class ProfessionalAvailiableHours {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'professional_id', type: 'integer' })
  professionalId: number;

  @Column({ name: 'day', type: 'enum', enum: DayOfWeek })
  dayOfWeek: DayOfWeek;

  @Column({ name: 'hour', type: 'time' })
  hour: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => ProfessionalAttributes,
    (professionalAttributes) =>
      professionalAttributes.professionalAvailiableHours,
  )
  @JoinColumn({ name: 'professional_id' })
  professionalAttributes: ProfessionalAttributes;
}
