import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private REST_API: string = 'http://localhost:8000/api/'
  httpHeaders = new HttpHeaders().set('Content-type', 'aplication/json')

  constructor(private httpClient: HttpClient) { }
  getTasks() {
    return this.httpClient.get(this.REST_API, { headers: this.httpHeaders })
  }
  getTask(id: any) {
    return this.httpClient.get(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      })

    )

  }
  createTask(data: Task) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.REST_API, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  updateTask(id: any, data: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.REST_API}/${id}`, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  
  deleteTask(id: any) {
    return this.httpClient.delete(`${this.REST_API}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse) {
    let errorMsg: string = ''
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`
    }
    return throwError(() => {
      errorMsg
    })
  }

}
