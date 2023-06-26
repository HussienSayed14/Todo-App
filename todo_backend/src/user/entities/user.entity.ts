import { Post } from "src/post/entities/post.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        nullable:false
    })
    userName: string

    
    @Column({
        type: "varchar",
        nullable:false,
        unique:true
    })
    email: string

    
    @Column({
        type: "varchar",
        nullable:false
    })
    password: string
@OneToMany(()=>Post ,(post)=> post.user ,{eager:true})
posts: Post[]

}
