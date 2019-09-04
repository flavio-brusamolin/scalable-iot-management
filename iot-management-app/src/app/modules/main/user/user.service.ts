import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from 'src/app/app.api';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    private url = `${API}/user`;

    constructor(private http: HttpClient) { }

    listUsers(): Promise<any> {
        const header = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(this.url, { headers: header }).toPromise();
    }

}
