import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
    this.checkLogin();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(event: Event){
    event.preventDefault();
    //este token debe ir en todas las peticiones
    const value = this.form.value;
    this.authService.login(
      value.email,
      value.password
    )
    .subscribe(data => {
      console.log('Suscribe de login component: ', data);
      this.router.navigate(['']);
    });
  }

  checkLogin(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['']);
    }
  }
}
