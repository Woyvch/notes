import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-username',
  templateUrl: './dialog-username.component.html',
  styleUrls: ['./dialog-username.component.css']
})

export class DialogUsernameComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string}
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}