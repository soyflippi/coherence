import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { EstadoUsuario } from '../enums/estado-usuario.enum';

export class Usuario {
    public id?: string;
    public nombre?: string;
    public apellido?: string;
    public dni?: string;
    public cuil?: string;
    public correo?: string;
    public clave?: string;
    public foto?: string;
    public perfil: TipoUsuario;
    public estado?: EstadoUsuario;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
