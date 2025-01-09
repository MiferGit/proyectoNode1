import { Request, Response } from "express";
import { PostService } from "./services/post.service";
import { error } from "console";

export class PostController {

    constructor(
        private readonly postService: PostService // inyectamos la dependencia de la clase PostService ´para la logica
    ) {}

 //************CREAMOS LOS METODOS no son estaticos los instanciamos en erchivo de los postroutes ***************************************************************** */   
        createPost = async (req: Request, res: Response) => {  // creamos metodo de CREARPOST

            this.postService.createPost(req.body) // traemos lo de los postService y como devuelve promesa utilizamos .then// y de postService traemos el metodo req.body resibiendo lo creado en el postman titulo y descipcion
            .then((data: any) => {
                return res.status(201).json(data);
            })

            .catch((error: any)=> {
                return res.status(500).json({
                    message: 'Error Post createPost',
                    error,
                })
            })
        };

        //************************************************************ */
        findAllPost = async (req: Request, res: Response) => {  // creamos metodo de BUSCARTODOSLOSPOST
           
            this.postService
            .findAllPost()  
            .then((data) => {
                return res.status(200).json(data);
            })

            .catch((error)=> {
                return res.status(500).json({
                    message: 'Error interno findAllPost',
                    error,
                })
            })
        }
}