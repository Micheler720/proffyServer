import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn, JoinColumn, OneToOne, OneToMany,
} from 'typeorm';
import User from './Users';
import Subject from './Subjects';
import ClassSchedules from './ClassSchedules';

@Entity('class')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject_id: string;

  @OneToOne(() => Subject)
  @JoinColumn({ name: 'subject_id' })
  subject: Subject;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ClassSchedules, (classSchedules) => classSchedules.classe)
  classSchedules: ClassSchedules[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  cost: number;
}
export default Class;
