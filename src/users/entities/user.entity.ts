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
import { Shipment } from 'src/shipments/entities/shipments.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  phone: string;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Shipment, (shipment) => shipment.user, { cascade: true })
  shipments: Shipment[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

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
