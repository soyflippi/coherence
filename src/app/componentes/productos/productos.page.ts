import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { AuthService } from 'src/app/servicios/auth.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { Producto } from 'src/app/clases/producto';
import { Sectores } from 'src/app/enums/sectores.enum';
import { EditarProductoPage } from './editar-producto/editar-producto.page';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  listaProductos: any;
  listaComida: any;
  listaBebida: any;
  listaPostre: any;

  constructor(
    public usuarioService: UsuarioService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.utilsService.presentLoading();
    this.productoService.obtenerProductos().subscribe(prods => {
      this.utilsService.dismissLoading();
      console.log(prods);
      this.listaProductos = prods;
      this.listaComida = this.filtrarComida();
      this.listaBebida = this.filtrarBebida();
      this.listaPostre = this.filtrarPostre();
    }, error => console.log(error));
  }

  agregarProducto() {
    this.utilsService.showLoadingAndNavigate('productos/alta-producto');
  }

  editarProducto(producto: Producto) {
    const callback = (p: Producto) => this.productoService.actualizarProducto(p);
    this.utilsService.presentModal(EditarProductoPage, { producto, callback });
  }

  eliminarProducto(producto: Producto) {
    const callback = () => this.productoService.borrarProducto(producto);
    this.utilsService.presentAlertConfirm('Atención', '¿Estás seguro que deseas borrar este producto?', callback);
  }

  filtrarComida() {
    return this.listaProductos.filter((prod: Producto) => prod.sector === Sectores.COMIDAS);
  }

  filtrarBebida() {
    return this.listaProductos.filter((prod: Producto) => prod.sector === Sectores.BEBIDAS);
  }

  filtrarPostre() {
    return this.listaProductos.filter((prod: Producto) => prod.sector === Sectores.POSTRES);
  }

  volver(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

  public getPerfil(): string { // PATO
    return localStorage.getItem('perfil');
  }
}
