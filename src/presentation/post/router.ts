import { Router } from "express";
import { PostController } from "./controller";
import { PostService } from "./services/post.service";


export class PostRoutes {
    static get routes(): Router {   //Cuando tenemos una clase y dentro un metodo estatic no es necesario hacer instancia osea ej: const appRoutes = new AppRoutes()
        const router = Router();


        const postService = new PostService();  //instanciamos la clase del archivo service PostService
        const postController = new PostController(postService); //instanciamos la clase del archivo controller PostController y hacemos la inyeccion como parametro postService
  //*************************************************************************************************** */
  //REALIZAMOS LAS PETICIONES DE LOS METODOS DE LOS CONTROLLERS
  
        router.get('/', postController.findAllPost); // el get es para obtener buscar y llamamo al metodo finAllPost

        router.post('/', postController.createPost); // el post es para crear y llamamos al metodo createPost

        return router;
    }
}