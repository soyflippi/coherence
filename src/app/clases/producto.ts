export class Producto {
    public id?: string;
    public codigo?: string;
    public nombre?: string;
    public descripcion?: string;
    public fotos?: string[];
    public tiempo?: number;
    public precio?: number;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
    public sector: string;
    public cantidad = 0; // agregrego LUCAS para parte de pedir-productos
}
