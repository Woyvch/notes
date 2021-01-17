import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Note } from './note'
import { User } from './user';


@Injectable({
  providedIn: 'root'
})

export class NotesService {

  // URL to web api
  private notesUrl = 'https://mercury-chivalrous-structure.glitch.me/notes';

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

  // Opvragen van alle notities
  getNotes = (): Observable<Note[]> => { // Observable niet nodig?
    return this.http.get<Note[]>(this.notesUrl, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Opvragen van een bepaalde notitie
  getNote = (note: Note): Observable<Note> => {
    let data = note.id;
    return this.http.get<Note>(`https://mercury-chivalrous-structure.glitch.me/note/${data}`, this.httpOptions);
  }

  // Opvragen van alle notities van een gebruiker
  getNoteFromUser = (user: User): Observable<Note[]> => {
    let data = user.name ;
    return this.http.get<Note[]>(`${this.notesUrl}/${data}`, this.httpOptions);
  }

  // Toevoegen van een notitie voor een gebruiker
  addNote = (user: User, note: Note): Observable<Note> => {
    let data = {
      'name': user.name,
      'title': note.title,
      'content': note.content,
      'category': note.category,
    };
    // POST data zit in de HTTP body
    return this.http.post<Note>(this.notesUrl, data, this.httpOptions);
  }

  // Aanpassen van een notitie voor een gebruiker
  updateNote = (note: Note): Observable<Note> => {
    let data = {
      'id': note.id,
      'title': note.title,
      'content': note.content,
      'category': note.category
    };
    // PUT data zit in de HTTP-body
    return this.http.put<Note>(this.notesUrl, data, this.httpOptions);
  }

  // Verwijderen van een notitie voor een gebruiker
  deleteNote = (note: Note): Observable<Note> => {
    let data = note.id;
    return this.http.delete<Note>(`${this.notesUrl}/${data}`, this.httpOptions);
  }

  // Een notitie opzoeken aan de hand van een titel of de inhoud
  searchNote = (user: User, search: string): Observable<Note[]> => {
    // Gebruik makend van query parameters   
    let id = user.id;
    search = search.trim();
    let params = new HttpParams({ fromString: `id=${id}&search=${search}` });
    return this.http.get<Note[]>(`https://mercury-chivalrous-structure.glitch.me/searchnote?`, {params});
  }

  // De categorieen ophalen van een bepaalde gebruiker
  getCategories = (user: User): Observable<Note[]> => {
    let data = user.id ;
    return this.http.get<Note[]>(`https://mercury-chivalrous-structure.glitch.me/categories/${data}`, this.httpOptions);
  }

  // De notities ophalen met een bepaalde categorie
  getCategory = (note: Note): Observable<Note[]> => {
    let data = note.category ;
    return this.http.get<Note[]>(`https://mercury-chivalrous-structure.glitch.me/category/${data}`, this.httpOptions);
  }
}