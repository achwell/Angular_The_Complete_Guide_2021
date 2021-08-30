import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanDeactivate,
  Params,
  Router,
  RouterStateSnapshot, UrlTree
} from "@angular/router";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";
import {config, Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivate<CanDeactivateGuard> {
  server: { id: number, name: string, status: string };
  serverName: string = '';
  serverStatus: string = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    );
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = params['allowEdit'] === "1";
      }
    );
    this.route.fragment.subscribe();
    this.route.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.server = this.serversService.getServer(id);
    })
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['..'], {relativeTo: this.route})
  }

  canDeactivate(component: CanDeactivateGuard, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !this.allowEdit ? true :
      (this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ? confirm("Do ypu want to discard changes?") :
        true;
  }

}
