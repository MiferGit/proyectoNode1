//APPROUTER: EJECUTA LAS RUTAS DEL LOS OTROS ARCHIVOSEJ: POSTROUTES
// Es bueno realizar otros archivos para generar mas rutas ejemplo : PRODUCTO: crear, leer, actualizar, eliminar   COMPRAS: crear, leer, actualizar, eliminar

import { Router } from "express";  //importamos Router de expres 
import { PostRoutes } from "./post/router";

//Cuando tenemos una clase y dentro un metodo estatic no es necesario hacer instancia osea ej: const appRoutes = new AppRoutes() / idea: Nombreclase.metodo osea = AppRoutes.routes

export class AppRoutes { 

    static get routes(): Router {
        const router = Router();
//*********************************************************************************************** */
        router.use('/api/post', PostRoutes.routes)  //importamos el metodo del archivo router PostRoutes
    //   router.use('/api/comment', CommentRoutes.routes) se esperaria asi los archivos de rutas a futuro

        return router
    }
}