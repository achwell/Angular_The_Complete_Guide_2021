import {Component, OnInit} from '@angular/core';
import {UsersService} from "./users.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers: string[] = [];
  inactiveUsers: string[] = [];

  constructor(private usersService: UsersService) { }

  onSetToInactive(id: number) {
    this.usersService.inActivateUser(id);
  }

  onSetToActive(id: number) {
    this.usersService.activateUser(id);
  }
  ngOnInit(): void {
    this.inactiveUsers = this.usersService.inactiveUsers;
    this.activeUsers = this.usersService.activeUsers;
  }
}
