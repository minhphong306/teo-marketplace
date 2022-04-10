import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('expend')
class Expend {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column({
    name: 'created_user_id',
    nullable: false
  })
  public createdUserId: number

  @Column({
    nullable: false
  })
  public name: string

  @Column({
    comment: '1-revenue, 2-expend',
    nullable: false
  })
  public type: number

  @Column({
    comment: '1-gamee, 2-starbots',
    nullable: false
  })
  public team: number

  @Column({
    nullable: false
  })
  public amount: number

  @Column({
    name: 'head_count_log',
    nullable: false
  })
  public headCountLog: string

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

export default Expend;
