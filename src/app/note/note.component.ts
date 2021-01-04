import { Component, OnInit, Input } from '@angular/core';

import { NotesService } from '../notes.service'
import { Note } from '../note'
import { User } from '../user'

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() user: User;

  notes: Note[];

  constructor(private notesService: NotesService) { }

  selectedNote: Note;
  onSelect(note: Note): void {
    this.selectedNote = note;
  }

  selectedUser: User;
  onSelectUser(user: User): void {
    this.selectedUser = user;
  }

  ngOnInit(): void {
    this.getNoteFromUser(this.user.name);
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe(data => {
      this.notes = data;
      console.log(data);
    });
  }

  getNoteFromUser(name: string): void {
    this.notesService.getNoteFromUser({name} as User).subscribe(result => {
      this.notes = result;
      console.log(result);
    });
  }

  addNote(title: String, content: String, category: string) {
    title = title.trim();
    content = content.trim();
    category = category.trim();
    if (!content) { return; }
    this.notesService.addNote(this.user, {title, content, category} as Note).subscribe(note => {
      this.notes.push(note);
      console.log(note);
    });
  }

  deleteNote(note: Note) {
    this.notes =  this.notes.filter(n => n !== note);
    this.notesService.deleteNote(note).subscribe(result => {
      console.log(result);
    });
  }

}
