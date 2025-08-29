import { ProfessionalCertificateType } from 'src/shared/types/professionalCertificateTypes.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProfessionalAvailiableHours } from './professional-availiable-hours.entity';

@Entity('professional_attributes')
export class ProfessionalAttributes {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'user_id', unsigned: true, type: 'integer' })
  userId: number;

  @Column({
    name: 'certificate_type',
    type: 'enum',
    enum: ProfessionalCertificateType,
  })
  certificateType: ProfessionalCertificateType;

  @Column({ name: 'certificate_number', type: 'varchar', length: 255 })
  certificateNumber: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.professionalAttributes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ProfessionalAvailiableHours,
    (professionalAvailiableHours) =>
      professionalAvailiableHours.professionalAttributes,
  )
  professionalAvailiableHours: ProfessionalAvailiableHours[];
}
