import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Note } from '../note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})

export class NoteDetailComponent implements OnInit {

  note: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // note.id
    this.notesService.getNote({id} as Note).subscribe((result) => {
      this.note = result;
      console.log(result);
    });
  }

  updateNote(): void {
    this.notesService.updateNote(this.note).subscribe((result) => {
      console.log(result);
    });
  }

  goBack(): void {
    this.location.back();
  }

}
