import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.listUsers();
  }

  async listUsers() {
    const response = await this.userService.listUsers();
    this.users = response.users;
  }

}
