import { Address } from 'src/address/entities/address.entity';
import { Parcel } from 'src/parcel/entities/parcel.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  shipment_purpose: string;

  @Column({ type: 'varchar', length: 255 })
  shipment_type: string;

  @Column({ type: 'varchar', length: 255 })
  shipment_id: string;

  @OneToOne(() => Address)
  pickup_address: Address;

  @OneToOne(() => Address)
  delivery_address: Address;

  @OneToOne(() => Parcel)
  parcel: Parcel;

  @ManyToOne(() => User, (user) => user.shipments)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
