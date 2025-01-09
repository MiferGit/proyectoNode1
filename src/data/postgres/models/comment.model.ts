
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Comment extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('text', {
        nullable: false,
    })
    content: string;

    //ESTAS LLAVES FORANEAS LAS DEJAMOS PENDIENTES EN TODOS LOS MODELOS
    // @Column('uuid', {
    //     nullable: false,
    // })
    // post_id: string;


    // @Column('uuid', {
    //     nullable: false,
    // })
    // comment_by: string;


    @Column('timestamp', {
        default: () => 'CURRENT_TIMESTAMP',
    })
    created_at: Date;
}




// TABLA DE RELACIONES COMMENTARIOS
// Table comment {
//     id uuid [pk]
//     content text [not null]
  
//     post_id uuid [not null]
//     comment_by uuid [not null]
//     created_at timestamp [default: 'now()']
//   }