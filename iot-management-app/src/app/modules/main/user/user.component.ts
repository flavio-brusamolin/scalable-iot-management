import { Component, OnInit } from '@angular/core';

import { UserService } from './user.service';

import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;

  constructor(private userService: UserService, private notifier: NotificationService) { }

  ngOnInit() {
    this.listUsers();
  }

  async listUsers() {
    const response = await this.userService.listUsers();
    this.users = response.users;
  }

  async removeUser(userId) {
    const response = await this.userService.removeUser(userId);
    this.notifier.showSuccess('Muito bem!', response.message);
    await this.listUsers();
  }

}
