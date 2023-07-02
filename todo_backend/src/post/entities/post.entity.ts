import { timeStamp } from "console"
import { User } from "src/user/entities/user.entity"
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('post')
export class Post extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        nullable:false
    })
    postText: string

    @Column({
    type: "varchar",
    default: "onGoing"
  })
  status: string


  @CreateDateColumn()
    created_at: Date

  

    
   @ManyToOne(()=> User ,(user) =>user.posts,{onDelete:'CASCADE'})
   user:User
}
