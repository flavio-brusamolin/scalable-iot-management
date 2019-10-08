import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  /* show success notification */
  showSuccess(title: string, body: string): void {
    this.toastr.success(body, title);
  }

  /* show error notification */
  showError(title: string, body: string): void {
    this.toastr.error(body, title, {
      onActivateTick: true
    });
  }

}
