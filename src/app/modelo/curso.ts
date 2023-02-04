import { v4 as uuidv4 } from 'uuid';

export class Curso {
  private id: String;
  private nombre: String;
  private valoracion: Number;

  constructor(nombre: String, valoracion: Number) {
    this.id = uuidv4();
    this.nombre = nombre;
    this.valoracion = valoracion;
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
}
