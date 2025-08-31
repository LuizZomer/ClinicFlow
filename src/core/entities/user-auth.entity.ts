import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_auth')
export class UserAuth {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true, type: 'integer' })
  id: number;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({
    name: 'verification_code',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  verificationCode: string;

  @Column({
    name: 'user_id',
    unsigned: true,
    type: 'integer',
    nullable: true,
  })
  userId: number;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.userAuth)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor(data?: Partial<UserAuth>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
