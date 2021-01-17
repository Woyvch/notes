import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from './user'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  // URL to web api
  private usersUrl = 'https://mercury-chivalrous-structure.glitch.me/users';

  // Injecteren van de HttpClient service
  constructor(private http: HttpClient) { };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* Eventuele errors opvangen */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(`${error.error}`);
  }

  // Geeft een lijst van alle gebruikers terug
  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(this.usersUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Geeft een enkele gebruiker terug
  getUser = (user: User): Observable<User> => {
    let data = user.id;
    return this.http.get<User>(`${this.usersUrl}/${data}`, this.httpOptions);
  }

  // Toevoegen van een gebruiker
  addUser = (user: User): Observable<User> => {
    let data = {
      'name': user.name
    };
    // POST data zit in de HTTP body
    return this.http.post<User>(this.usersUrl, data, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Verwijderen van een gebruiker
  deleteUser = (user: User): Observable<User> => {
    let data = user.name;
    return this.http.delete<User>(`${this.usersUrl}/${data}`, this.httpOptions);
  }

  // De naam van een gebruiker wijzigen
  updateUser = (user: User): Observable<User> => {
    let data = {
      'id': user.id,
      'name': user.name
    };
    // PUT data zit in de HTTP-body
    return this.http.put<User>(this.usersUrl, data, this.httpOptions);
  }
}