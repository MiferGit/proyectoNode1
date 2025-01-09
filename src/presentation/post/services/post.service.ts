///Aqui vamos a colocar la logica de los controladores

import { Post } from "../../../data/postgres/models/post.model";

//Para poder ejecutar los metodos de esta clase PostService en el archivo de controladores dentro de su clase PostController realizamos la inyeccion de dependencias
export class PostService {
    constructor() {}

 //*******************METODOS DE INYECCION************************************************************* */   
     async findAllPost() { 
        try {
            const posts = await Post.find(); //traemos todos los post de la base de datos sin instanciar nada y utilizamos el metodo find
            return posts; //retornamos los post y como es una promesa se envuelve en un try catch 
        } catch (error) {
            throw new Error('Error en la busqueda de los post');
            
        }
        
       
     }

// *******************************************************************************************
     async createPost(postData: any){ // escribimos eso y como es Post creamos en el postman con los model el titulo y contenido y esto se resive en el archivo controller postController en el metodo createPost(req.body)
        // return {
        //     postData, // traemos el posData 
        //     message: 'Creando Post!!c',
        // }
        //VAMOS HACER UNA ISNTANCIA DE ESE MODELO LO ANTERIOR ES COMO PARA VER SI SE EJECUTA

        const post = new Post(); //instanciamos el modelo Post que importamos del modelo
        post.title = postData.title; //le asignamos el titulo que traiga postData de el almacenamiento de datos req.body q hicimos en el postman
        post.content = postData.content; //le asignamos el contenido que traiga postData de el almacenamiento de datos req.body q hicimos en el postman

        //Colocamos await para que espere a que se guarde en la base de datos
        try {
            return await post.save(); //guardamos el post en la base de datos
        } catch (error) {
            throw new Error('Error en la creacion del post');
        
     }

} 
}