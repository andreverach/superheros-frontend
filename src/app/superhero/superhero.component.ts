import { Component, OnInit } from '@angular/core';
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
    private service: SuperherosService
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
      console.log(error);
      this.loading = false;//o con un pipe finalize podria hacerlo en una linea este loading
    });
  }
}
