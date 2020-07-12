import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'inicio', component: InicioComponent }, // PATO
  {
    path: 'splash',
    loadChildren: () => import('./app.component').then(m => m.AppComponent)
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'pedir-productos',
    loadChildren: () => import('./componentes/pedir-productos/pedir-productos.module').then(m => m.PedirProductosPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./componentes/clientes/clientes.module').then(m => m.ClientesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./componentes/usuarios/usuarios.module').then(m => m.UsuariosPageModule)
  },
  {
    path: 'mesas',
    loadChildren: () => import('./componentes/mesas/mesas.module').then(m => m.MesasPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./componentes/productos/productos.module').then(m => m.ProductosPageModule)
  },
  {
    path: 'clientes-espera',
    loadChildren: () => import('./componentes/home/clientes-espera/clientes-espera.module').then(m => m.ClientesEsperaPageModule)
  },
  {
    path: 'propinas',
    loadChildren: () => import('./componentes/propinas/propinas.module').then(m => m.PropinasPageModule)
  },
  {
    path: 'propinas',
    loadChildren: () => import('./componentes/propinas/propinas.module').then(m => m.PropinasPageModule)
  },
  {
    path: 'pendientes',
    loadChildren: () => import('./componentes/home/pendientes/pendientes.module').then(m => m.PendientesPageModule)
  },
  {
    path: 'mozo',
    loadChildren: () => import('./componentes/mozo/mozo.module').then(m => m.MozoPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./componentes/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
