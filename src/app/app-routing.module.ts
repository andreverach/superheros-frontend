import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { AttackHeroComponent } from './attack-hero/attack-hero.component';
import { LoginComponent } from './login/login.component';
import { SuperheroComponent } from './superhero/superhero.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/superheros',
    pathMatch: 'full'
  },
  {
    path: 'superheros',//asignamos la ruta
    canActivate: [AdminGuard],
    component: SuperheroComponent,//asignamos un componente
  },
  {
    path: 'profile',//asignamos la ruta
    canActivate: [AdminGuard],
    component: AttackHeroComponent,//asignamos un componente
  },
  { path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }