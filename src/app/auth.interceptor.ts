import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()

//ng g interceptor auth  -> creara un interceptor llamado auth
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  //cambiamos unknown por any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    //ejecutamos la funcion del addToken
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>){
    //const token = "Bearer 32|lh2Q3sx0xRK7gqu3bOL9U7KjjzCdsDW1JmgEESIa";//+ this.tokenService.getToken();
    const token = "Bearer " + this.tokenService.getToken();
    //console.log('Auth interceptor (addToken):', token);
    if(token){//validamos token
      //clonamos el requeste para decir que queremos que cambie algunos datos
      //para que asi podamos modificar o setear ciertos datos que queremos que se envien
      //por ejemplo setearemos la cabecera de la peticion con el token
      request = request.clone({
        setHeaders: {
          authorization : token
        },
      });
      return request;//devuelve un reuqest modificado con nuestro token
    }
    return request;//como no hay token en el if entonces envia el request sin token
    //o enviar un error para que nos diga que agreguiemos un token
  }
}
