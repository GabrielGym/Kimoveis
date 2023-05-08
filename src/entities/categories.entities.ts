import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categories")
class Category {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45, unique: true })
  name: string;
}

export { Category };
