import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Superhero } from '../superhero';
import { SuperherosService } from '../superheros.service';

@Component({
  selector: 'app-superhero',
  templateUrl: './superhero.component.html',
  styleUrls: ['./superhero.component.scss']
})
export class SuperheroComponent implements OnInit {

  heros!: Superhero[];
  loading: boolean = false;

  constructor(
    private service: SuperherosService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showSuperheros();
  }

  showSuperheros(){
    this.loading = true;
    this.service.getSuperheros()
    .subscribe((result: any) => {
      this.heros = result.heros;
      this.loading = false;
    },
    error => {
      console.log('Error in component: ', error);
      this.loading = false;//o con un pipe finalize podria hacerlo en una linea este loading
    });
  }

  //el logout se puede mover al appcomponent o meter el estado de una variable isLoggedIn en el
  //appcomponent y que escuche cualquier cambio en toda la aplicacion y que cuando cerremos esta variable lo sepa
  logout(){
    if(this.authService.logout()){
      console.log('sii cerro sesion');
      this.router.navigate(['./login']);
    }
    console.log('noo cerro sesion');
  }
}
