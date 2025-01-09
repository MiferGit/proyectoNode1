import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Post } from "./models/post.model";
import { Comment } from "./models/comment.model";

interface Options {
    host: string;   // host entenderlo como la direccion IP o el dominio de donde esta la base de datos
    port: number;   // puerto de la base de datos
    username: string; // nombre de usuario // la base de datos va a pedir un ususario
    password: string; // contraseña // la base de datos va a pedir una contraseña
    database: string; // la base de datos va a pedir el nombre de la base de datos
}

export class PostgresDatabase {

    public datasource: DataSource; // sale de la instalacion de typeorm

    constructor(options: Options) {  // en eñ contructor inicializamos la variable datasource como el anterior Options
        this.datasource = new DataSource({  //Resibe un objeto con las opciones interface
            type: 'postgres',  // A que base de datos me voy a conecatar en este caso Postgres
            host: options.host,
            port: options.port,
            username: options.username,
            password: options.password,
            database: options.database,
            entities: [User, Post, Comment],  // entidades que van a ser mapeadas OSEA ARCHIVOS MODELO importamos el Modelo
            synchronize: true,  // sincroniza las entidades modelos con la base de datos
            ssl: {
                rejectUnauthorized: false,
            }  // conexion segura
        })
    } 
    
    async connect() {   // Creo un metodo asincrono para conectar la base de datos
        try {
            await this.datasource.initialize() // llamo al datasource y aplico metodo initialize para inicializarlo conectar la base de datos ya que datasource ya esta configurado type, host. username etc
            console.log('base de datos conectada 👉');
        }
        catch(error) {
            console.log('Error connecting to the database', error);
        }
    } 


}
/////VAMOS AL INDEX PARA IMPORTAR POSTGRESDATABASE
//en el terminal hay un texto que dice ceneccion insegura nos pide que usemos 'sslmode=require' para que sea segura la conexion a la base de datos y para ello la colocamos en un objeto en la lista del contructor de opciones ssl: {rejecUnauthorized: false} y en el objeto de datasource de PostgresDatabase