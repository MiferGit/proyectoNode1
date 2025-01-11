import { Request, Response } from "express";
import { PostService } from "./services/post.service";
import { CreatePostDTO, CustomError, UpdatePostDTO } from "../../domain";

export class PostController {

    constructor(
        private readonly postService: PostService // inyectamos la dependencia de la clase PostService ´para la logica
    ) {}

    private handleError =(error: unknown, res: Response)=> { //creamos un metodo privado que va a resibir dos cosas el error: unknown porque no sabemos que va a resibir y luego la res de tipo response que envia el error al cliente
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({
                message: error.message
            })
        }
           console.log(error);
           return res.status(500).json({message: 'something went'})
    }

 //************CREAMOS LOS METODOS no son estaticos los instanciamos en erchivo de los postroutes ***************************************************************** */   
        createPost = (req: Request, res: Response) => {  // creamos metodo de CREARPOST

         const [error, createPostDto] = CreatePostDTO.create(req.body)  //traemos los DTO del postDTO.ts create y req.body, y desestructuramos en arreglo con cualquier nombre (createPostDto)si fuera objeto tendria que ir el nombre tal cual se retorna
            if(error) return res.status(422).json({message: error})


            this.postService.createPost(createPostDto!) // traemos lo de los postService y como devuelve promesa utilizamos .then// y de postService traemos el createPostDto resibiendo lo creado en el postman titulo y descipcion // El signo de interrogacion adelante  createPostDto! es para que confie que no va hacer undefined
            .then((data: any) => {
                return res.status(201).json(data);
            })
            .catch((error: unknown)=> this.handleError(error, res)); 
        };

        //************************************************************ */
        findAllPost = (req: Request, res: Response) => {  // creamos metodo de BUSCARTODOSLOSPOST
           
            this.postService
            .findAllPost()  
            .then((data) => {
                return res.status(200).json(data);
            })

            .catch((error: unknown)=> this.handleError(error, res))
        }

        //**************************************************************************************** */
        findOnePost = (req: Request, res: Response) => {

            const {id} = req.params; // se resibe el id que viene del findOnePost se service y validamos se lo enviamos al servicio
           

            this.postService.findOnePost(id) // enviamos al servicio el id ya que esta esperando q enviemos un id
            .then((data: any) => {
                res.status(200).json(data)
            })
            .catch((error: unknown) => this.handleError(error, res))
            
        }

     //****************************************************************************************** */   
     updatePost = (req: Request,  res: Response) => {

        const {id} = req.params;
        const [error, updatePostDto] = UpdatePostDTO.create(req.body)
        if(error) return res.status(422).json({message: error})

        this.postService.updatePost(id, updatePostDto!) // resive id y req.body del service  de hay se actualiza postamn
        .then((data)=>{
            return res.status(200).json(data);
        })
        .catch((error: unknown)=> this.handleError(error, res));
     };

     //********************************************************************************************** */
     deletePost = (req: Request, res: Response) => {

        const {id} = req.params; //Ojo el mismo nombre que le doy al id de const tiene que ser igual al de la ruta que meta a post

        this.postService.deletePost(id)
        .then(() => {
            return res.status(204).json(null); //significa que cuando se elimina algo no es necesario enviar nada solo el estatus que dice que se elimino corectamnte
        })
        .catch((error: unknown) => this.handleError(error, res))
     }
}