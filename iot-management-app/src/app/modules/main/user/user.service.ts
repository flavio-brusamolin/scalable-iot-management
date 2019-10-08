import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from 'src/app/app.api';

@Injectable()
export class UserService {

    private url = `${API}/user`;

    constructor(private http: HttpClient) { }

    /* api request for list users */
    listUsers(): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(this.url, { headers }).toPromise();
    }

    /* api request for store new users */
    storeUser(user: any): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.post(this.url, user, { headers }).toPromise();
    }

    /* api request for update users data */
    updateUser(user: any, userId: string): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.put(`${this.url}/${userId}`, user, { headers }).toPromise();
    }

    /* api request for remove users */
    removeUser(userId: string): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.delete(`${this.url}/${userId}`, { headers }).toPromise();
    }

}
