///Aqui vamos a colocar la logica de los controladores

import { Post } from "../../../data/postgres/models/post.model";
import { CreatePostDTO, CustomError, UpdatePostDTO } from "../../../domain";


//Para poder ejecutar los metodos de esta clase PostService en el archivo de controladores dentro de su clase PostController realizamos la inyeccion de dependencias
export class PostService {
    constructor() {}

 //*******************METODOS DE INYECCION************************************************************* */   
     async findAllPost() { 
        try {
            return await Post.find({  //retornamos los post y como es una promesa se envuelve en un try catch //traemos todos los post de la base de datos sin instanciar nada y utilizamos el metodo find
                where: {
                    status: true,
                }
            }); 
           
        } catch (error) {
            throw CustomError.internalServer('error obteniendo datos')
            
        }
     }
  //************************************************************************************************* */   

  async findOnePost(id: string){  //Resibe el id de tipo string enntonces en el controller resibe id desestructurado
 
    const post = await Post.findOne({
        where: {
            id: id,   //Resibe el id del modelo sea igia id del parametro
            status: true, // de los modelos para saber si se elimino o no
        }
    });   

    if(!post) {
        throw CustomError.notFoud('Error post no encontrado')
    } 
    return post;
  }

// *******************************************************************************************
     async createPost(postData: CreatePostDTO){ // escribimos eso y como es Post creamos en el postman con los model el titulo y contenido y esto se resive en el archivo controller postController en el metodo createPost(req.body)
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
            throw CustomError.internalServer('Error en la creacion del post');//500 al crear
        
     }

   } 

   //********************************************************************************************** */
   async updatePost(id: string, postData: UpdatePostDTO){  //se necita resibir en este servicio para actualizar el id y la data
     const post = await this.findOnePost(id)  //Tiene el mismo metodo del findOnePost por eso lo utilizamos y devuelve un apromesa await colocamos y ya esta validado los errores // tiene un metodo que va a buscartt un post si encuentra el post al post.title lo comvierte a minusculas y elimina espacios al igual que el post.content
     post.title = postData.title.toLowerCase().trim(); //El trim elimina espacion si alguien envia el titulo con espacion ejempolo los elimina y lo guarda en minusculas con el toLowerCase 
     post.content = postData.content.trim();
    try {
        return await post.save(); //await porque devuelve una promesa
    } catch (error) {
        throw CustomError.internalServer('Error al actualizar') //500
    }
   }

   //********************************************************************************************** */
   async deletePost(id: string) {
        const post = await this.findOnePost(id); // como no puedo eliminar fisicamente entonces generamos una actualizacion como la siguiente:
        post.status = false;

        try {
            return await post.save();
        } catch (error) {
            throw CustomError.internalServer('Error al eliminar')//500
        }


   }

}