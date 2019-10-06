import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { NotificationService } from '../../services/notification/notification.service';

import * as decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private notifier: NotificationService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('currentUserToken');
    const tokenPayload: any = decode(token);
    if (tokenPayload.userRole !== expectedRole) {
      this.notifier.showError('Permission denied!', 'Administrator resource');
      this.router.navigate(['/devices-network']);
      return false;
    }
    return true;
  }

}
