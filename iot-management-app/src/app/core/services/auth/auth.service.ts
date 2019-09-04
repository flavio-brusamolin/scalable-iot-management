import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { API } from 'src/app/app.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  private url = `${API}/user/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUserToken');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(user: any): Promise<any> {
    return this.http.post(this.url, user).toPromise();
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
