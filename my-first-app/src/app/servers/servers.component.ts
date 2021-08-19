import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  template: `
    <h3>Servers</h3>
    <app-server></app-server>
    <app-server></app-server>
  `,
  styles: [`
    h3 {
      color: #1e90ff;
    }
  `]
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
