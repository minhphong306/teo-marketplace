import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('staff')
class Staff {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column()
  public name: string

  @Column()
  public status: number;

  @Column({
    name: 'join_date',
    nullable: false
  })
  public joinDate: Date;

  @Column({
    name: 'retired_date',
    nullable: false
  })
  public retiredDate: Date;

  @Column({
    comment: '1-gamee, 2-starbots',
    nullable: false
  })
  public team: number

  @Column()
  public note: string

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

export default Staff;
