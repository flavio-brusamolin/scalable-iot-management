import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API } from 'src/app/app.api';

@Injectable()
export class DevicesNetworkService {

    private url = `${API}/device`;

    constructor(private http: HttpClient) { }

    listDevices(): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(this.url, { headers }).toPromise();
    }

    getDeviceData(deviceId: string): Promise<any> {
        const headers = new HttpHeaders().append('x-access-token', localStorage.getItem('currentUserToken'));
        return this.http.get(`${this.url}/${deviceId}`, { headers }).toPromise();
    }

}
