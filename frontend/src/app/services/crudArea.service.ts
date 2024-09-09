// crudArea.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Area } from '../models/area.model';

@Injectable({
  providedIn: 'root',
})
export class CrudAreaService {
  private REST_API: string = 'http://localhost:8000/api/areas';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getAreas(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(this.REST_API, { headers: this.httpHeaders });
  }

  getArea(id: any): Observable<Area> {
    return this.httpClient.get<Area>(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      })
    );
  }

  createArea(data: Area): Observable<Area> {
    return this.httpClient.post<Area>(this.REST_API, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  updateArea(id: any, data: Area): Observable<Area> {
    return this.httpClient.put<Area>(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    );
  }

  deleteArea(id: any): Observable<void> {
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
