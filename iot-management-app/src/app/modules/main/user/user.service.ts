import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from 'src/app/app.api';

@Injectable()
export class UserService {

    private url = `${API}/user`;

    constructor(private http: HttpClient) { }

    listUsers(): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(this.url, { headers }).toPromise();
    }

    storeUser(user: any): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.post(this.url, user, { headers }).toPromise();
    }

    updateUser(user: any, userId: string): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.put(`${this.url}/${userId}`, user, { headers }).toPromise();
    }

    removeUser(userId: string): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.delete(`${this.url}/${userId}`, { headers }).toPromise();
    }

}
