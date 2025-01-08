///Aqui vamos a colocar la logica de los controladores
//Para poder ejecutar los metodos de esta clase PostService en el archivo de controladores dentro de su clase PostController realizamos la inyeccion de dependencias
export class PostService {
    constructor() {}

 //*******************METODOS DE INYECCION************************************************************* */   
     async findAllPost() { 
        return {
            message: 'Buscando todos los post'
        }
     }


     async createPost(){
        return {
            message: 'Creando Post!!',
        }
     }

}