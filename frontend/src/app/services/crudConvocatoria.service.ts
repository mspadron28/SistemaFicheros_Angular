// crudConvocatoria.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Convocatoria } from '../models/convocatoria.model';

@Injectable({
  providedIn: 'root'
})
export class CrudConvocatoriaService {
  private REST_API: string = 'http://localhost:8000/api/convocatorias/';
  httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getConvocatorias(): Observable<Convocatoria[]> {
    return this.httpClient.get(this.REST_API, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getConvocatoria(id: any): Observable<Convocatoria> {
    return this.httpClient.get(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }


  createConvocatoria(data: Convocatoria): Observable<Convocatoria> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<Convocatoria>(this.REST_API, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  updateConvocatoria(id: any, data: any): Observable<Convocatoria> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Convocatoria>(`${this.REST_API}/${id}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  

  deleteConvocatoria(id: any): Observable<any> {
    return this.httpClient.delete(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(() => {
      errorMsg;
    });
  }
}
