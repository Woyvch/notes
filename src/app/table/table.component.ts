import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
/* Componenten */
import { User } from '../user'
import { UserService } from '../user.service';
import { DialogUsernameComponent } from '../dialog-username/dialog-username.component';
/* Material */
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource, TableItem } from './table-datasource';
import { MatTableDataSource } from '@angular/material/table'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;

  data: User[];
  //dataSource = new MatTableDataSource(this.data);
  dataSource: User[];
  sortedData: User[];

  /* Kolommen die toegevoegd worden in de tabel */
  displayedColumns = ['id', 'name', 'options'];

  constructor(private userService: UserService, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar) {
                //this.sortedData = this.data.slice();
               }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  /*sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }*/

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

  openDialog(id: number, name: string): void {
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
        //console.log(`Dialog result: id=${user.id}, name=${user.name}`);
      }
    );
  }

}
