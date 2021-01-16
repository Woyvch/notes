import { Component, ViewChild, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../user';
import { Note } from '../note';
import { NotesService } from '../notes.service';
import { DialogNoteComponent } from '../dialog-note/dialog-note.component'
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
  
  panelOpenState = false;

  selectedValue: string;
  
  notes: Note[];
  //categories: Note[];

  // Route parameters
  userId = +this.route.snapshot.paramMap.get('id'); // user.id
  userName = this.route.snapshot.paramMap.get('name'); // user.name

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private breakpointObserver: BreakpointObserver,
    private notesService: NotesService,
    public dialog: MatDialog, 
    public snackBar: MatSnackBar
  ) { }

  // Based on the screen size, switch from standard to one column per row
  /*cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) { 
        return [
          { title: 'Card 1', cols: 2, rows: 1 },
          { title: 'Card 2', cols: 2, rows: 1 },
          { title: 'Card 3', cols: 2, rows: 1 },
          { title: 'Card 4', cols: 2, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );*/
  
  ngOnInit(): void {
    console.log(`id: ${this.userId}, name: ${this.userName}`);
    this.getNoteFromUser(this.userName);
    //this.getCategories();
  }

  getNoteFromUser(name: string): void {
    this.notesService.getNoteFromUser({name} as User).subscribe(result => {
      this.notes = result;
      console.log(result);
    });
  }

  // Alle caterogieën van een gebruiker ophalen
  /*getCategories(): void {
    let id = +this.route.snapshot.paramMap.get('id'); // user.id
    this.notesService.getCategories({id} as User).subscribe(result => {
      this.categories = result;
      console.log(result);
      this.createSelect();  
    });
  };

  createSelect(): void {
    for (let index = 0; index < this.categories.length; index++) {
      const element: Note = this.categories[index];
      if (element.category) {
        // Create the "option" element and add it to the "select" element
        let option = document.createElement("option");
        option.setAttribute("value", element.category);
        // Add a name to the "option element"
        let name = document.createTextNode(element.category);
        option.appendChild(name);
        document.getElementById("categoryElement").appendChild(option);
      };
    };
  };*/

  deleteNote(note: Note) {
    //this.notes =  this.notes.filter(n => n !== note);
    this.notesService.deleteNote(note).subscribe(
      result => {
        this.notes =  this.notes.filter(n => n !== note);
        console.log(result);
      }
    );
  }

  /*addNote(title: String, content: String, category: string) {
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
  }*/

  addNote2(): void {
    let title: string;
    let content: string;
    let category: string;
    let user: User = {
      'id': this.userId,
      'name': this.userName,
    };
    // Een dialoogvenster openen
    let dialogRef = this.dialog.open(DialogNoteComponent, {
      data: {title, content, category }
    });
    // De notitie wijzigen
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != undefined) {
          this.notesService.addNote(user, result).subscribe(
            (response) => {
              console.log(response);
              this.snackBar.open(`${response}`, 'Ok', { duration: 5000 });
            }
          );
          this.getNoteFromUser(user.name);
        };
      }
    );
  }

  updateNote(note: Note): void {
    // Een dialoogvenster openen
    let dialogRef = this.dialog.open(DialogNoteComponent, {
      data: note
    });
    // De notitie wijzigen
    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result != undefined) {
          this.notesService.updateNote(note).subscribe(
            (response) => {
              console.log(response);
              this.snackBar.open(`${response}`, 'Ok', { duration: 5000 });
            }
          );
        };
      }
    );
  }

  searchNote(input: string): void {
    console.log(input);
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

  /*searchNote(title: string, content: string): void {
    let id = +this.route.snapshot.paramMap.get('id'); // user.id
    if (title || content) {
      this.notesService.searchNote({id} as User, {title, content} as Note).subscribe(result => {
        this.notes = result;
        console.log(result);
      });
    };
  };*/

  getCategory(category: string): void {
    this.notesService.getCategory({category} as Note).subscribe(result => {
      this.notes = result;
      console.log(result);
    })
  }

}
