import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, body: string): void {
    this.toastr.success(body, title);
  }

  showError(title: string, body: string): void {
    this.toastr.error(body, title, {
      onActivateTick: true
    });
  }

}
