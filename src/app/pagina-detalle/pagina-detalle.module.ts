import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaDetallePageRoutingModule } from './pagina-detalle-routing.module';

import { PaginaDetallePage } from './pagina-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaDetallePageRoutingModule
  ],
  declarations: [PaginaDetallePage]
})
export class PaginaDetallePageModule {}
