import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { Parcel } from './parcel.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Packaging {
  @Column({ type: 'int', primary: true, generated: true })
  id: number;
  @Column({ type: 'int' })
  height: number;
  @Column({ type: 'int' })
  width: number;
  @Column({ type: 'int' })
  length: number;
  @Column({ type: 'int' })
  weight: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'enum', enum: ['box', 'envelope', 'pallet'] })
  type: 'box' | 'envelope' | 'pallet';
  @Column({ type: 'varchar', length: 2 })
  size_unit: string;
  @Column({ type: 'varchar', length: 2 })
  weight_unit: string;
  @Column({ unique: true })
  packaging_id: string;
  @OneToOne(() => Parcel, (parcel) => parcel.packaging)
  parcel: Parcel;

  @OneToOne(() => User)
  user: User;
}
