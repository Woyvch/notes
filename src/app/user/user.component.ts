import { Component, OnInit, Input } from '@angular/core';

import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() name: string;

  users: User[];

  // Geef de details weer van een gebruiker wanneer er op geklikt wordt
  selectedUser: User;
  onSelect(user: User): void {
    this.selectedUser = user;
  }

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((result: User[]) => {
      this.users = result;
      console.log(result);
    });
  }

  addUser(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({name} as User).subscribe((result: User) => {
      this.users.push(result);
      console.log(result);
    });
  }

  deleteUser(user: User) {
    // Vragen of de gebruiker inderdaad verwijderd moet worden
    this.userService.deleteUser(user).subscribe((result) => {
      this.users =  this.users.filter(n => n !== user);
      console.log(result);
    });
  }

}
