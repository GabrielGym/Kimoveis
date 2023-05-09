import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./realEstate.entities";
import { User } from "./users.entities";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({type: "date"})
  date: Date | string

  @Column({type: 'time'})
  hour: string | number

  @ManyToOne(() => RealEstate, realestate => realestate.id)
  realEstateId: RealEstate

  @ManyToOne(() => User, users => users.id)
  userId: User
}

export { Schedule };