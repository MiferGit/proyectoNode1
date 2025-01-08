//configuramos en server la configuracion de servidor de express va hacer como nuestro app.ts
   import express, { Router }  from "express";


interface Optiones { //
    port: number;
    routes: Router
}

   export class Server {
    
    //TRES PROPIEDADES PARA CREAR EL ARCHIVO SERVER**********************************************************
    private readonly app = express(); //Cuando tenemos propdes que no van a cambiar utlz readonly q va hacer de lectura
    private readonly port: number;  //variable del puerto de tipo numero
    private readonly routes: Router; // va a tener todas las rutas de la aplicacion que es de tipo Router de express

    //Cuando queremos setearles un valor a esas propiedades que estan sin inicializar lo hacemos con el contructor y son propiedades que se van a instanciar en el archivo app.ts /const server = new Server({port: 3000, routes: AppRoutes.routes,});
 //*********************************************************************************************************** */   
    constructor(options: Optiones) { // resibimos un parametro de server: port y routes no estan inicializ, el contruc resibe como parmetro un objeto options de tipado Options interface
        this.port = options.port;  //se setean los valores a los atributos del server arriba
        this.routes = options.routes

    }

 //************************************************************************************************************** */   

    //Creamos un Metodo Asincrono start   //use: sirve para ejectar funciones
    async start(){  // este metodo va  a lanzar la ejecucion de la aplicacion
        this.app.use(express.json()) //Permite leer formato json
        this.app.use(express.urlencoded({extended: true})) //Permite leer otro tipo de formato como Angular y otros

        this.app.use(this.routes) // Ejecuta las rutas que el servido va a resibir

        this.app.listen(this.port, () => {  //listen: pone al servidor escuchar el puerto
            console.log(`Server started on port ${this.port} 👽`);
        })
    }

   }; 


