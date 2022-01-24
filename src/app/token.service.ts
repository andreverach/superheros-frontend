import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//ng g s token -> servicio para actualizar el token en el localstorage del navegador
export class TokenService {

  constructor() { }

  saveToken(token: string){
    console.log('token service (saveToken):', token);
    //comprobar si el nombre 'token' puede ser cualquier nombre
    localStorage.setItem(//guardamos el token en un name_key llamado token
      'token', token
    );
  }

  getToken(){
    return localStorage.getItem('token');//recuperamos el token con su name_key
  }

  deleteToken(){
    localStorage.removeItem('token');
    return true;
  }
}
