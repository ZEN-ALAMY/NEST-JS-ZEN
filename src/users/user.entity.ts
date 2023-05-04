import {Entity,Column,PrimaryGeneratedColumn,AfterInsert,AfterUpdate,AfterRemove} from 'typeorm'
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log('New Element is added with id',this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Element is udated with id',this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log('Element is removed with id',this.id)
    }
}