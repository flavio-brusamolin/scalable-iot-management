import { Component, OnInit } from '@angular/core';

import { smoothlyMenu } from 'src/app/app.helpers';

import { AuthService } from 'src/app/core/services/auth/auth.service';

declare const $: any;

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  /* toggle navigation menu */
  toggleNavigation(): void {
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }

  /* logout */
  logout(): void {
    this.authService.logout();
  }

}
