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
    const url = `${environment.apiV1}/v1/heros`;
    return this.httpClient.get(url)
    .pipe(
      retry(3),
      catchError(this.handleError),
      map(//no lo tipo en este caso para poder acceder a mas datos del array en el componente
        (response: any) => /*(response.data) as Cliente[]*/ response
      )
    );   
  }

  private handleError(error: HttpErrorResponse){
    //console.log('Error service: ', error); .status etc etc
    let message = 'Whoops! Por favor intentar nuevamente.';
    return throwError(message);
  }
  
}
