import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
/* Componenten*/
import { User } from '../user';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component'
/* Material */
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  selectedValue: string;
  
  notes: Note[];

  // Route parameters
  userId = +this.route.snapshot.paramMap.get('id'); // user.id
  userName = this.route.snapshot.paramMap.get('name'); // user.name

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.getNoteFromUser(this.userName);
  }

  getNoteFromUser(name: string): void {
    this.notesService.getNoteFromUser({name} as User).subscribe(result => {
      this.notes = result;
      console.log(result);
    });
  }

  deleteNote(note: Note) {
    this.notesService.deleteNote(note).subscribe(
      result => {
        this.notes =  this.notes.filter(n => n !== note);
        console.log(result);
      }
    );
  }

  addNote(title: String, content: String, category: string) {
    let user: User = {
      'id': this.userId,
      'name': this.userName,
    };
    title = title.trim();
    content = content.trim();
    category = category.trim();
    if (!content) { return; }
    this.notesService.addNote(user, {title, content, category} as Note).subscribe(note => {
      this.notes.push(note);
      console.log(note);
    });
  }

  updateNote(note: Note): void {
    /* Een dialoogvenster openen */
    let dialogRef = this.dialog.open(DialogNoteComponent, {
      data: note
    });
    /* De notitie wijzigen */
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != undefined) {
          this.notesService.updateNote(note).subscribe(
            (response) => {
              console.log(response);
            }
          );
        };
      }
    );
  }

  searchNote(input: string): void {
    let user: User = {
      'id': this.userId,
      'name': this.userName,
    };
    if (input) {
      this.notesService.searchNote(user, input).subscribe(result => {
        this.notes = result;
        console.log(result);
      });
    };
  }

  getCategory(category: string): void {
    if (category) {
      this.notesService.getCategory({category} as Note).subscribe(result => {
        this.notes = result;
        console.log(result);
      })
    };
  }

}
