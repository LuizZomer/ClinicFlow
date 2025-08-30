import { Roles } from 'src/shared/types/enum/roles.enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfessionalAttributes } from './professional-attributes.entity';
import { UserAuth } from './user-auth.entity';
import { Appointment } from './appointment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'document', type: 'varchar', length: 255 })
  document: string;

  @Column({ name: 'email', type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'role', enum: Roles, default: Roles.USER })
  role: Roles;

  @OneToOne(() => UserAuth, (userAuth) => userAuth.user)
  userAuth: UserAuth;

  @OneToOne(
    () => ProfessionalAttributes,
    (professionalAttributes) => professionalAttributes.user,
  )
  professionalAttributes: ProfessionalAttributes;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointmentsAsPatient: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.professional)
  appointmentsAsProfessional: Appointment[];
}
