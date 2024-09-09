// crudDepartamento.service.ts

import { Injectable } from '@angular/core';
import { Departamento } from '../models/departamento.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudDepartamentoService {
  private REST_API: string = 'http://localhost:8000/api/departamentos';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getDepartamentos(): Observable<Departamento[]> {
    return this.httpClient.get<Departamento[]>(this.REST_API, { headers: this.httpHeaders });
  }

  getDepartamento(id: any): Observable<Departamento> {
    return this.httpClient.get<Departamento>(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      })
    );
  }

  createDepartamento(data: Departamento): Observable<Departamento> {
    return this.httpClient.post<Departamento>(this.REST_API, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateDepartamento(id: any, data: Departamento): Observable<Departamento> {
    return this.httpClient.put<Departamento>(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteDepartamento(id: any): Observable<void> {
    return this.httpClient.delete<void>(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
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
    return throwError(() => errorMsg);
  }
}
