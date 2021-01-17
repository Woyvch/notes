import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
/* Componenten */
import { User } from '../user'
import { UserService } from '../user.service';
import { DialogUsernameComponent } from '../dialog-username/dialog-username.component';
/* Material */
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<User>;

  dataSource: User[];

  /* Kolommen die toegevoegd worden in de tabel */
  displayedColumns = ['id', 'name', 'options'];

  constructor(private userService: UserService, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar
              ) { }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.table.dataSource = this.dataSource;
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.dataSource = response;
        console.log(this.dataSource);
      }
    );
  }

  addUser(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({name} as User).subscribe(
      (response) => { // succes
        this.dataSource.push(response);
        console.log(response);
        this.table.renderRows();
      },
      (error) => { // error
        this.snackBar.open(`${error}`, 'Ok', { duration: 5000 });
      }
    );
  }

  deleteUser(id: number,name: string): void {
    let user: User = {
      'id': id,
      'name': name
    };
    /* Vragen of de gebruiker inderdaad verwijderd moet worden */
    this.userService.deleteUser(user).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
      }
    );
  }

  updateUser(id: number, name: string): void {
    let user: User;
    /* Een dialoogvenster openen */
    let dialogRef = this.dialog.open(DialogUsernameComponent, {
      data: {
        id,
        name,
      }
    });
    /* De naam van de gebruiker wijzigen */
    dialogRef.afterClosed().subscribe(
      (result) => {
        user = {
          'id': id,
          'name': result,
        };
        if (user.name != undefined) {
          this.userService.updateUser(user).subscribe(
            (response) => {
              console.log(response);
              this.getUsers();
            }
          )
        }
      }
    );
  }

}
