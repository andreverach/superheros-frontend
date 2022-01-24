import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

//ng g s auth  -> creara un servicio llamado auth
export class AuthService {

  //import los servicios necesarios
  constructor(
    private httpCliente: HttpClient,
    private tokenService: TokenService
  ) { }

  //metodo para obtener el token del usuario autenticado
  login(email: string, password: string){
    let name = 'Superhero';
    return this.httpCliente.post('http://127.0.0.1:8000/api/login', {
      email, password, name
    })
    .pipe(
      tap( (data: any) => {
        console.log('Auth service (login):', data);
        const token = data.token;
        this.tokenService.saveToken(token);
      })
    );
  }

  logout(){
    return this.tokenService.deleteToken();
  }

  //verifico si hay algun usuario loqueado mediante si existe el token de autentiacion o no
  isLoggedIn(): boolean {
    return localStorage.getItem("token") ? true : false;
  }
}
