import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Packaging } from './packaging.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('parcel_items')
export class ParcelItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['document', 'parcel'] })
  type: 'document' | 'parcel';

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'float' })
  value: number;
}

@Entity('parcels')
export class Parcel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255 })
  parcelId: string;

  @OneToMany(() => ParcelItem, (item) => item, { cascade: true, eager: true })
  @JoinColumn()
  items: ParcelItem[];

  @OneToOne(() => Packaging, (packaging) => packaging.parcel, {
    cascade: true,
  })
  @JoinColumn()
  packaging: Packaging;

  @OneToOne(() => User)
  user: User;
}
