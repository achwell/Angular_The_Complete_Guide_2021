import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-servers]',
  templateUrl: './servers.component.html',
  styles: [`
    label {
      color: #1e90ff;
    }
    .white-text {
      color: #ffffff;
    }
  `]
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = 'testServer';
  serverCreated = false;
  username = '';
  servers = ['TestServer1', 'TestServer2'];
  showText: boolean = false;
  log = [];

  constructor() {
    setTimeout(() => this.allowNewServer = true, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = `${this.serverName} was created`;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  toggleText() {
    this.showText = !this.showText;
    this.log.push(new Date());
  }

}
