import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends ApiService {

  shareSessionWithASP(session: any){
    return this.http.post('https://dev.shocklogic.com/scripts/JMEvent/create_session.asp', session, this.httpOptions);
  }

  shareSessionWithLaravel(session: any){
    return this.http.post('https://dev.shocklogic.com/v2/createSession', session, this.httpOptions);
  }

  shareMultipleSession(session: any){
    let responseASP = this.http.post('https://dev.shocklogic.com/scripts/JMEvent/create_session.asp', session, this.httpOptions);
    let responseLaravel = this.http.post('https://dev.shocklogic.com/v2/createSession', session, this.httpOptions);
    return forkJoin([responseASP, responseLaravel]);
  }

}
