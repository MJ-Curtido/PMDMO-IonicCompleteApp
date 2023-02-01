import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaDetallePage } from './pagina-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaDetallePageRoutingModule {}
