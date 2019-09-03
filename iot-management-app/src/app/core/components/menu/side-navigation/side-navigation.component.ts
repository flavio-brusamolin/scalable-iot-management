import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as decode from 'jwt-decode';
import { AuthService } from 'src/app/core/services/auth/auth.service';

declare const $;

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnInit {

  username: string;
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    $('#side-menu').metisMenu();
    this.username = localStorage.getItem('currentUserName');
    this.isAdmin = this.checkPermission();
  }

  checkPermission(): boolean {
    const token = localStorage.getItem('currentUserToken');
    const tokenPayload: any = decode(token);
    const role = tokenPayload.userAuthRole;
    return role === 'admin' ? true : false;
  }

  activeRoute(routename: string): boolean {
    return (this.router.url.toString() === routename);
  }

  logout(): void {
    this.authService.logout();
  }

}
