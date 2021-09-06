import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultSubscription: string = 'Advanced';
  password: string = "";
  submitted = false;

  onSubmit() {
    console.log("email: " + this.signupForm.value.userData.email)
    console.log("subscriptions: " + this.signupForm.value.userData.subscriptions)
    console.log("password: " + this.signupForm.value.userData.password)
    this.submitted = true;
    this.signupForm.reset();

  }
}
