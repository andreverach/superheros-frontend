import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperheroComponent } from './superhero/superhero.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { AttackHeroComponent } from './attack-hero/attack-hero.component';


@NgModule({
  declarations: [
    AppComponent,
    SuperheroComponent,
    LoginComponent,
    AttackHeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,//a la variable constante de interceptor de angular
      useClass: AuthInterceptor,//le digo que use mi clase de interceptor para cambiar las urls
      multi: true//y las aplique a todas
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
