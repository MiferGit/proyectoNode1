import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post extends BaseEntity { 

    @PrimaryGeneratedColumn("uuid")
    id: string;


    @Column("varchar", {
        length: 100,
        nullable: false,
    })
    title: string;


    @Column("text", {
        nullable: false,
    })
    content: string;


    @Column("varchar", {array: true, nullable: true})
    imgs: string[];



    //publish_by: Pendiente

    @Column("timestamp", {
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at: Date;
}


//DIAGRAMA DE RELACIONES
// Table post {
//     id uuid [pk]
//     title varchar(100) [not null]
//     content text [not null]
//     imgs varchar[] [not null]
//     publish_by uuid [not null]
//     created_at timestamp [default: 'now()']
//   }

//una vez ya ejecutado vamos Neon y damos en tabla y tiene que aparecer todos los modelos que hayamos echo
