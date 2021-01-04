import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { UserService } from './user.service';

import { User } from './user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'notities';

  constructor() { }

  ngOnInit() { }

}
