import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpsvcService {

  // apiUrl = 'http://localhost:3000'
  apiUrl = '/api'  // proxy-config.js running

  constructor(private http: HttpClient) { }

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/countries')
      .pipe(
        tap(_ => console.log('fetched countries')),
        catchError(this.handleError<string[]>('getCountries', []))
      );
  }

  getfromCountry(country: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/country/' + country)
    .pipe(
      tap(_ => console.log('fetched wines')),
      catchError(this.handleError<string[]>('getfromCountry'))
    );
  }

  getWineDetail(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/wine/' + id)
    .pipe(
      tap(_ => console.log('fetched wine')),
      catchError(this.handleError<any>('getWineDetail'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
