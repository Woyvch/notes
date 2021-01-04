import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

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

  // Opvragen van alle notities
  getNotes = (): Observable<Note[]> => { // Observable niet nodig?
    return this.http.get<Note[]>(this.notesUrl, this.httpOptions);
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
      'content': note.content
    };
    // PUT data zit in de HTTP-body
    return this.http.put<Note>(this.notesUrl, data, this.httpOptions);
  }

  // Verwijderen van een notitie voor een gebruiker
  deleteNote = (note: Note): Observable<Note> => {
    let data = note.id;
    return this.http.delete<Note>(`${this.notesUrl}/${data}`, this.httpOptions);
  }

  // Een notitie opzoeken aan de hand van een titel
  searchNote = (user: User, note: Note): Observable<Note[]> => {
    let id = user.id;
    let title = note.title;
    //return this.http.get<Note[]>(`https://mercury-chivalrous-structure.glitch.me/search?id=${id}&title=${title}`, this.httpOptions);
    return this.http.get<Note[]>(`https://mercury-chivalrous-structure.glitch.me/users/${id}/notes/${title}`, this.httpOptions);
  }

  /*searchNote = (user: User, note: Note) => {
    let data = {
      'id': user.id,
      'title': note.title,
    };
    return this.http.get<Note[]>(`https://mercury-chivalrous-structure.glitch.me/search?`, {params: data});
  }*/

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
