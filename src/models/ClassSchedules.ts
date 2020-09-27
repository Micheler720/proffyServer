import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';
import Class from './Class';

@Entity('class_schedules')
class ClassSchedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  class_id: string;

  @ManyToOne(() => Class, (item) => item.classSchedules)
  @JoinColumn({ name: 'class_id' })
  class: Class;

  @Column()
  week_day: number;

  @Column()
  time: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default ClassSchedules;
