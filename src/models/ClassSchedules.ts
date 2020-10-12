import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
import Class from './Class';

@Entity('class_schedules')
class ClassSchedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Class, (classe) => classe.classSchedules)
  classe: Class;

  @Column()
  week_day: number;

  @Column()
  to: number;

  @Column()
  from: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default ClassSchedules;
