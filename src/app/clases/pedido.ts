import { Producto } from './producto';
import { EstadoPedido } from '../enums/estado-pedido.enum';

export class Pedido {
    public id?: string;
    public productos?: [{ cantidad?: number, producto?: Producto, terminado?: boolean, entregado?: boolean }?] = [];
    public tieneDescuento?: boolean;
    public usuario?: { id: string, nombre: string };
    public mesa?: { id: string, numero: number };
    public estado?: EstadoPedido = EstadoPedido.PENDIENTE;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
    public mensajes?: {
        text: string,
        created_at: any,
        user: {
            id: string,
            nombre: string
        },
        destinatario: string
    }[];
    public propina?: {satisfaccion: string, porcentaje: number};
    public encuesta?: {
        calidad: number,
        servicio: number,
        limpieza: number,
        comentarios?: string
    };
}
