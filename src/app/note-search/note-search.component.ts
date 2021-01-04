import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Note } from '../note';
import { User } from '../user';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-search',
  templateUrl: './note-search.component.html',
  styleUrls: ['./note-search.component.css']
})
export class NoteSearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private location: Location
  ) { }

  //@Input() note: Note;
  //@Input() user: User;

  notes: Note[];
  categories: Note[];

  ngOnInit(): void {
    this.getCategories();
  }

  searchNote(title: string): void {
    let id = +this.route.snapshot.paramMap.get('id'); // user.id
    if (title) {
      this.notesService.searchNote({id} as User, {title} as Note).subscribe(result => {
        this.notes = result;
        console.log(result);
      });
    }
  }

  // Alle caterogieën van een gebruiker ophalen
  getCategories(): void {
    let id = +this.route.snapshot.paramMap.get('id'); // user.id
    this.notesService.getCategories({id} as User).subscribe(result => {
      this.categories = result;
      console.log(result);
      this.createSelect();  
    })
  }

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
      }
    }
  }

  getCategory(category: string): void {
    this.notesService.getCategory({category} as Note).subscribe(result => {
      this.notes = result;
      console.log(result);
    })
  }

  goBack(): void {
    this.location.back();
  }

}
