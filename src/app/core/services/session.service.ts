import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SessionService extends ApiService {

  httpSessionOptions = {
    headers: new HttpHeaders({
    'Token-App': '7875d82ca05f8ba818011eb04a890c20cb44c52e',
    'Content-Type': 'application/x-www-form-urlencoded',
    })
  }

  shareSessionWithASP(session: any){
    return this.http.post('https://dev.shocklogic.com/scripts/JMEvent/create_session.asp', session, this.httpSessionOptions);
  }

  shareSessionWithLaravel(session: any){
    return this.http.post('https://dev.shocklogic.com/v2/createSession', session, this.httpSessionOptions);
  }

  shareMultipleSession(session: any){
    let responseASP = this.http.post('https://dev.shocklogic.com/scripts/JMEvent/create_session.asp', session, this.httpSessionOptions);
    let responseLaravel = this.http.post('https://dev.shocklogic.com/v2/createSession', session, this.httpSessionOptions);
    return forkJoin([responseASP, responseLaravel]);
  }

}
