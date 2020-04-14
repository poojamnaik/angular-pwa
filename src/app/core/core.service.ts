import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable( {providedIn: 'root'})
export class CoreService {

    path = '/api';
    constructor(private http: HttpClient) {

    }

    addPushSubscriber(sub: any) {
        return this.http.post<any>(`${this.path}/subscribe`, sub);
    }

    sendPushNotifications() {
        return this.http.post<any>(`${this.path}/send`, null);
    }

    healthCheck() {
        console.log('Inside health check');
        return this.http.get<any>(`${this.path}/health-check`);
    }

}
