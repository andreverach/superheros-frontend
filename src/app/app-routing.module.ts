import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroComponent } from './superhero/superhero.component';

const routes: Routes = [
  {
    path: '',//asignamos la ruta
    component: SuperheroComponent,//asignamos un componente
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
