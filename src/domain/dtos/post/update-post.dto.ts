export class UpdatePostDTO {

    
        constructor(
            public readonly title: string,
            public readonly content: string,
        ) {}
    
        //Colocamos un metodo estatico create()
        static create(object: {  [key: string]: any }): [string?, UpdatePostDTO?] { //Resibimos por el metodo la data q es un objeto y puede ser cualquier cosa que nos envien el postman quien ejecute por eso se le coloca 'object: {  [key: string]: any }' porque de postman viene ejemplo "title": "sjdufvv334545" donde title es una key tipo string y lo siguiente es any porque puede ser cualquier cosa, este metodo create esta esperando ese objeto edl potsman
    
            //Dessetructuramos del objeto lo que stoy esperando que es el title y el content
            const { title, content} = object;
            //validamos si no nos llega estos datos// si hay un error no llega la data
            

            if(!title) return ['titulo no existe']
            if(title.length <= 8) return ['el titulo debe tener mas de 8 caracteres']
            if(typeof title !== 'string') return ['el titulo debe ser un string']

            if(!content) return ['contenido no existe']
            if(content.length <= 20) return ['el contenido debe tener al menos 20 caracteres']
            if(typeof content !== 'string') return ['el contenido debe ser un string']


            //Validamos que el contenido tenga al menos 2 párrafos
            const paragraphs = content.split('\n').filter((paragraph: string) => paragraph.trim().length > 0);
            if (paragraphs.length < 2) return ['el contenido debe tener al menos 2 párrafos'];

    //Si la ejecucu¿ion llega a este punto que haya pasado estas validaciones es que esta todo bien
            return [undefined, new UpdatePostDTO(title, content)]
        }
    
}