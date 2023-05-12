import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./addresses.entities";
import { Category } from "./categories.entities";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false})
  sold: boolean

  @Column({ type: "decimal", default: 0})
  value: number | string

  @Column({ type: "integer"})
  size: number

  @CreateDateColumn({ type: "date" })
  createdAt: string | Date;

  @CreateDateColumn({ type: "date" })
  updatedAt: string | Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address

  @ManyToOne(() => Category, (category) => category.realEstate)
  @JoinColumn()
  category: Category
}

export { RealEstate };