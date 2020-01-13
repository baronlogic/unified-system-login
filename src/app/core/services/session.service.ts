import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends ApiService {

  shareSessionWithASP(session: any){
    return this.http.post('https://dev.shocklogic.com/scripts/JMEvent/create_session.asp', session, this.httpOptions);
  }

  shareSesionWithLaravel(session: any){
    return this.http.post('https://dev.shocklogic.com/v2/projectList', session, this.httpOptions);
  }

}
