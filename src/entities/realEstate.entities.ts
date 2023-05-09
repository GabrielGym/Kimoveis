import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categories.entities";
import { Address } from "./addresses.entities";

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

  @CreateDateColumn()
  createdAt: string | Date;

  @CreateDateColumn()
  updatedAt: string | Date;

  @OneToOne(() => Address, address => address.id)
  addressId: Address

  @ManyToOne(() => Category)
  categoryId: Category
}

export { RealEstate };