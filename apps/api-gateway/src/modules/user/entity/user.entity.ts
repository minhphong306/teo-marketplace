import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column({ unique: true })
  public email: string

  @Column()
  public name: string;

  @Column()
  public password: string;

  @Column({
    default: 1,
    comment: "1-active, -1: inactive"
  })
  public status: number

  @CreateDateColumn({
    name: "created_at",
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  public createdAt?: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  public updatedAt?: Date;

  @Column({
    name: 'is_deleted',
    default: false
  })
  public isDeleted: boolean
}

export default User;
