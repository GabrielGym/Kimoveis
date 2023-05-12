import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entities";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type: "date"})
  date: Date | string

  @Column({type: 'time'})
  hour: string | number

  @Column({ type: "integer"})
  realEstateId: number

  @Column({ type: "integer"})
  userId: number

  @ManyToOne(() => User, (user) => user.id)
  user: User
}

export { Schedule };