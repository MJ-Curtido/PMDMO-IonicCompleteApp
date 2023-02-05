import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PaginaInicialPageRoutingModule } from './pagina-inicial-routing.module';

import { PaginaInicialPage } from './pagina-inicial.page';
import { ContenedorCursosComponent } from './componentesIonic/contenedor-cursos/contenedor-cursos.component';
import { FormularioIonicComponent } from './componentesIonic/formulario-ionic/formulario-ionic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PaginaInicialPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PaginaInicialPage,
    FormularioIonicComponent,
    ContenedorCursosComponent
  ],
})
export class PaginaInicialPageModule {}
