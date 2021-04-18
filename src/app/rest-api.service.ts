import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Youtochidatasource } from './youtochidatasource';
import { Youtochidatatool } from './youtochidatatool';
import { Youtochidataflow } from './youtochidataflow';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'https://peaceful-retreat-91246.herokuapp.com/';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + 'youtochi/datasources')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 
  // HttpClient API get() method => Fetch datasource list
  getDatasources(): Observable<Youtochidatasource> {
    return this.http.get<Youtochidatasource>(this.apiURL + 'youtochi/datasources')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
    // HttpClient API get() method => Fetch datatool list
  getDatatools(): Observable<Youtochidatatool> {
    return this.http.get<Youtochidatatool>(this.apiURL + 'youtochi/datatools')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

    // HttpClient API get() method => Fetch dataflow list
  getDataflows(): Observable<Youtochidataflow> {
    return this.http.get<Youtochidataflow>(this.apiURL + 'youtochi/dataflows')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
 

  // HttpClient API get() method => Fetch employee
  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create employee
  createEmployee(employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiURL + '/employees', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(id, employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id){
    return this.http.delete<Employee>(this.apiURL + '/employees/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
