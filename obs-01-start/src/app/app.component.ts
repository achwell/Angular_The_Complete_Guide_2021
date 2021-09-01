import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated: boolean = false;
  private activatedSubject;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSubject = this.userService.activatedSubject.subscribe((didActivate: boolean) => {
      this.userActivated = didActivate;
    })
  }

  ngOnDestroy(): void {
    this.activatedSubject.unsubscribe();
  }
}
