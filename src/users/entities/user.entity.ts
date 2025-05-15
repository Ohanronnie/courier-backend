import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Address } from 'src/address/entities/address.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.user, {cascade: true})
  @JoinColumn()
  address: Address;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  private hashPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeInsert()
  beforeInsert() {
    this.hashPassword();
  }
  @BeforeUpdate()
  beforeUpdate() {
    this.hashPassword();
  }
}
