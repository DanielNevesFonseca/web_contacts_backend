import { getRounds, hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Contact } from 'src/contacts/entities/contacts.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  fullname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'char', length: 11 })
  phone_number: string | number;

  @CreateDateColumn()
  created_at: Date | string;

  @UpdateDateColumn()
  updated_at: Date | string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
