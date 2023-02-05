import { v4 as uuidv4 } from 'uuid';

export class Curso {
  private id: String;
  private nombre: String;
  private valoracion: Number;
  private rutaImg: String;

  constructor(nombre: String, valoracion: Number, rutaImg: String) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.valoracion = valoracion;
    this.rutaImg = rutaImg;
  }

  public getId(): String {
    return this.id;
  }

  public setId(value: String) {
    this.id = value;
  }

  public getNombre(): String {
    return this.nombre;
  }

  public setNombre(value: String) {
    this.nombre = value;
  }

  public getValoracion(): Number {
    return this.valoracion;
  }

  public setValoracion(value: Number) {
    this.valoracion = value;
  }

  public getRutaImg(): String {
    return this.rutaImg;
  }

  public setRutaImg(value: String) {
    this.rutaImg = value;
  }
}
