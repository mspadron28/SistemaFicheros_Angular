// crudGrupoInvestigacion.service.ts
import { Injectable } from '@angular/core';
import { GrupoInvestigacion } from '../models/grupo-investigacion.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudGrupoInvestigacionService {
  private REST_API: string = 'http://localhost:8000/api/grupos-investigacion';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getGruposInvestigacion(): Observable<GrupoInvestigacion[]> {
    return this.httpClient.get<GrupoInvestigacion[]>(this.REST_API, { headers: this.httpHeaders });
  }

  getGrupoInvestigacion(id: any): Observable<GrupoInvestigacion> {
    return this.httpClient.get<GrupoInvestigacion>(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      })
    );
  }

  createGrupoInvestigacion(data: GrupoInvestigacion): Observable<GrupoInvestigacion> {
    return this.httpClient.post<GrupoInvestigacion>(this.REST_API, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateGrupoInvestigacion(id: any, data: GrupoInvestigacion): Observable<GrupoInvestigacion> {
    return this.httpClient.put<GrupoInvestigacion>(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteGrupoInvestigacion(id: any): Observable<void> {
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
