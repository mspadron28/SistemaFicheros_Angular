// crudInvestigador.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Investigador } from '../models/investigador.model';

@Injectable({
  providedIn: 'root'
})
export class CrudInvestigadorService {
  private REST_API: string = 'http://localhost:8000/api/investigadores/';
  httpHeaders = new HttpHeaders().set('Content-type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getInvestigadores(): Observable<Investigador[]> {
    return this.httpClient.get(this.REST_API, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  getInvestigador(id: any): Observable<Investigador> {
    return this.httpClient.get(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  

  createInvestigador(data: Investigador): Observable<Investigador> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<Investigador>(this.REST_API, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  updateInvestigador(id: any, data: any): Observable<Investigador> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Investigador>(`${this.REST_API}/${id}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteInvestigador(id: any): Observable<any> {
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
