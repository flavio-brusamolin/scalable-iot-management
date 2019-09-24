import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from 'src/app/app.api';

@Injectable()
export class DevicesNetworkService {

    private url = `${API}/device`;

    constructor(private http: HttpClient) { }

    listDevices(): Promise<any> {
        const header = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(this.url, { headers: header }).toPromise();
    }

}
