import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Superhero } from '../superhero';
import { SuperherosService } from '../superheros.service';

@Component({
  selector: 'app-attack-hero',
  templateUrl: './attack-hero.component.html',
  styleUrls: ['./attack-hero.component.scss']
})
export class AttackHeroComponent implements OnInit {

  information!: any;
  heroes!: Superhero[];
  enemy!: Superhero;
  formData!: FormGroup;
  result!: any;
  error!: any;

  constructor(
    private service: SuperherosService,
    private formBuilder: FormBuilder,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.showUserInfo();
    this.listSuperheros();
  }

  private buildForm(){
    this.formData = this.formBuilder.group({
      enemy: []
    });    
  }

  showUserInfo(){
    this.service.getUserInfo()
    .subscribe((result: any) => {
      this.information = result.hero;
    },
    error => {
      console.log('Error in component: ', error);
    });   
  }

  listSuperheros(){
    this.service.getSuperheros()
    .subscribe((result: any) => {
      this.heroes = result.data;      
    },
    error => {
      console.log('Error in component: ', error);
    });
  }

  submit(){
    console.log('atacar');    
    this.service.attackEnemy(this.formData.value.enemy)
    .subscribe((result: any) => {
      console.log(result);
      this.enemy = result.enemy_status;
      this.result = result.damage + ' / ' + result.message;
      console.log(this.enemy);
      console.log(this.result);
    },
    error => {
      this.error = error;
      console.log('Error in component: ', error);
    });
  }

}
