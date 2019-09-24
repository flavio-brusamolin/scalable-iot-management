import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from './user.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

declare const $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any = [];
  actionedUser: any = {};

  userRole = 'user';

  addForm: FormGroup;
  editForm: FormGroup;

  constructor(private userService: UserService, private notifier: NotificationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializateForms();
    this.configurateCheck();
    this.listUsers();
  }

  initializateForms() {
    this.addForm = this.formTemplate();
    this.editForm = this.formTemplate();
  }

  formTemplate() {
    return this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required]),
      user: this.formBuilder.control('', [Validators.required]),
      password: this.formBuilder.control('', [Validators.required])
    });
  }

  configurateCheck() {
    $('.i-checks').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green',
    }).on('ifChecked', () => {
      this.userRole = 'admin';
    }).on('ifUnchecked', () => {
      this.userRole = 'user';
    });
  }

  async listUsers() {
    const { users } = await this.userService.listUsers();
    this.users = users;
  }

  async storeUser(user: any) {
    user.role = this.userRole;
    const { message } = await this.userService.storeUser(user);
    this.afterRequest(message, '#addModal');
    this.addForm.reset();
    $('#addCheck').iCheck('uncheck');
    this.userRole = 'user';
  }

  prepareEdition(user: any) {
    this.editForm.controls.name.setValue(user.name);
    this.editForm.controls.user.setValue(user.user);
    this.editForm.controls.password.setValue('');
    user.role === 'admin' ? $('#editCheck').iCheck('check') : $('#editCheck').iCheck('uncheck');
    this.actionedUser = user;
  }

  async updateUser(user: any) {
    user.role = this.userRole;
    const { message } = await this.userService.updateUser(user, this.actionedUser._id);
    this.afterRequest(message, '#editModal');
    this.userRole = 'user';
  }

  async removeUser() {
    const { message } = await this.userService.removeUser(this.actionedUser._id);
    this.afterRequest(message, '#removeModal');
  }

  afterRequest(message: string, modalId: string) {
    this.notifier.showSuccess('Muito bem!', message);
    $(modalId).modal('hide');
    this.listUsers();
  }

}
