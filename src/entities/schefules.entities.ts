import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entities";
import { RealEstate } from "./realEstate.entities";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type: "date"})
  date: Date | string

  @Column({type: 'time'})
  hour: string | number

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate

  @ManyToOne(() => User)
  user: User
}

export { Schedule };