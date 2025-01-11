import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() //los decoradores son funciones que permiten decorar los nombres de las clases, metodos, propiedades, parametros, etc. Ej: en el codigo se llama 'User' pero en la entidad base de datos se llamara  'usuarios'
export class User extends BaseEntity { //Colocamos todos los atributos que generamos en el diagrama de relaciones

    @PrimaryGeneratedColumn('uuid') //Este decorador es para indicar que es una llave primaria y que se va a generar automaticamente va encima de la propiedad que va a ser la llave primaria
    id: string; 


    @Column('varchar', { //Este decorador es para indicar que es una columna de la tabla
        length: 80,
        nullable: false,
    })
    name: string;


    @Column('varchar', {
        length: 80,
        nullable: false,
    })
    surname: string;


    @Column('varchar', {
        length: 80,
        nullable: false,
        unique: true   //indicamos que el email es unico aseguro eso
    })
    email: string;


    @Column('varchar', {
        nullable: false
    })
    password: string;


    @Column('date', {
        nullable: false
    })
    birthdate: Date;


    @Column('varchar')
    photo: string;

    
    @Column('bool', {     //Este estatus nos ayudara a saber si esta activo o eliminado
        default: true,
    })
    status: boolean;
} 



// DIAGRAMA DE RELACIONES
// Table user {
//     id uuid [pk]
//     name varchar(80) [not null]
//     surname varchar(80) [not null]
//     email varchar(80) [not null]
//     password varchar(255) [not null]
//     birthdate date [not null]
//     photo varchar(255)
//   }