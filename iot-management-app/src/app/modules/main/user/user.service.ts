import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from 'src/app/app.api';

@Injectable()
export class UserService {

    private url = `${API}/user`;

    constructor(private http: HttpClient) { }

    listUsers(): Promise<any> {
        const header = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(this.url, { headers: header }).toPromise();
    }

    removeUser(userId: string): Promise<any> {
        const header = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.delete(`${this.url}/${userId}`, { headers: header }).toPromise();
    }

}
