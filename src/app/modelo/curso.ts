//import { v4 as uuidv4 } from 'uuid';

export class Curso {
    //private id: String;
    private nombre:String;
    private valoracion:Number;

    constructor(nombre:String, valoracion: Number) {
        //this.id = uuidv4();
        this.nombre = nombre;
        this.valoracion = valoracion;
    }


}