import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(
        null,
        [Validators.required, this.invalidProjectName],
        this.asyncInvalidProjectName
      ),
      'email': new FormControl(
        null,
        [Validators.required, Validators.email]
      ),
      'projectStatus': new FormControl('critical'),
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectForm.reset();
  }

  invalidProjectName(control: FormControl): {[s: string]: boolean} {
    return control.value === 'Test' ? {'invalidProjectName': true} : null;
  }

  asyncInvalidProjectName(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({'invalidProjectName': true});
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
