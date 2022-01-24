import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

//ng g g admin -> creara un guardian llamado admin y elegimos CanActivate
export class AdminGuard implements CanActivate {

  //creamos un constructor para inyectar los servicios
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;//permitimos el acceso a las urls o no
    
    const url: string = state.url;//es algo sobre la ruta en la que estaba o algo asi
    console.log('Url en canActivate del guard: ',url);
    return this.checkLogin(url);//verifico si esta loqueado
  }

  checkLogin(url: string): true|UrlTree {
    if (!this.authService.isLoggedIn() && url === "/login") { 
      console.log('no esta logueado y es login');
      return true;
    }

    if (this.authService.isLoggedIn() && url === "/login") { 
      console.log('si esta logueado y es login');
      return this.router.parseUrl('/');//me deja pasar yendo a la url /
    }

    if (this.authService.isLoggedIn() && url !== "/login") { 
      console.log('si esta logueado y no es login');
      return true;//me deja seguir yendo a la url que quiero
    }
    console.log('AdminGuard: no entro a los if');
    // ver para que podria servir
    //this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/login');
  }
  
}
