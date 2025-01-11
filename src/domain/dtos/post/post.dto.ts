
export class CreatePostDTO { //los DTO permiten hacer validaciones


    constructor(
        public readonly title: string,
        public readonly content: string,
    ) {}

    //Colocamos un metodo estatico create()
    static create(object: {  [key: string]: any }): [string?, CreatePostDTO?] { //Resibimos por el metodo la data q es un objeto y puede ser cualquier cosa que nos envien el postman quien ejecute por eso se le coloca 'object: {  [key: string]: any }' porque de postman viene ejemplo "title": "sjdufvv334545" donde title es una key tipo string y lo siguiente es any porque puede ser cualquier cosa, este metodo create esta esperando ese objeto edl potsman

        //Dessetructuramos del objeto lo que stoy esperando que es el title y el content
        const {title, content} = object;
        //validamos si no nos llega estos datos// si hay un error no llega la data
        if(!title) return ['titulo no existe']
        if(title.length <= 5) return ['el titulo debe tener mas de 5 caracteres']
        if(!content) return ['contenido no existe']
        if(content.length <= 10) return ['el contenido debe tener al menos 10 caracteres']
//Si la ejecucu¿ion llega a este punto que haya pasado estas validaciones es que esta todo bien
        return [undefined, new CreatePostDTO(title, content)]
    }

    //Exportamos en el archivo de barril index.ts y esto lo utilizamos e el controlador el createPost
}