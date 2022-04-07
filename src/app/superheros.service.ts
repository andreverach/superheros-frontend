import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Superhero } from './superhero';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperherosService {

  constructor(
    private httpClient: HttpClient
  ) { }

    //como probablemente en el resultado desde laravel el json venga de esta manera
    //resultados.heros o .alguna_variable, entonces no lo tipo en el map para poder acceder a ella
    //si la tipo los datos que me aparecerian seria del modelo, entonces sin tipar podria hacer un 
    //result:any desde el component para poder acceder hasta ese resultado
  getSuperheros() : Observable<Superhero[]>{
    const url = `${environment.apiV1}/v1/heroes`;
    return this.httpClient.get(url)
    .pipe(
      retry(3),
      catchError(this.handleError),
      map(//no lo tipo en este caso para poder acceder a mas datos del array en el componente
        (response: any) => /*(response.data) as Cliente[]*/ response
      )
    );   
  }

  getSuperherosV2() : Observable<Superhero[]>{
    const url = `${environment.apiV1}/v2/heroes`;
    return this.httpClient.get(url)
    .pipe(
      retry(3),
      catchError(this.handleError),
      map(//no lo tipo en este caso para poder acceder a mas datos del array en el componente
        (response: any) => /*(response.data) as Cliente[]*/ response
      )
    );   
  }

  getUserInfo() : Observable<any>{
    const url = `${environment.apiV1}/v1/heroes/info`;
    return this.httpClient.get(url)
    .pipe(
      retry(3),
      catchError(this.handleError),
      map(
        (response: any) => response
      )
    );   
  }

  attackEnemy(enemy: any) : Observable<any>{
    const url = `${environment.apiV1}/v1/heroes/attack`;
    return this.httpClient.post(url, {enemy: enemy})
    .pipe(
      retry(3),
      catchError(this.handleError),
      map(
        (response: any) => response
      )
    );   
  }

  private handleError(error: HttpErrorResponse){
    //console.log('Error service: ', error); .status etc etc
    let message = 'Whoops! Por favor intentar nuevamente.';
    if(error.status === 405)
      message = error.error.message;
    return throwError(message);
  }
  
}
