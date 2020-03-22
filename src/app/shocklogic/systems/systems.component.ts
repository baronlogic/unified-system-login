import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {

  user: any;
  systems: any;
  token: string;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private sessionService: SessionService
  ) 
  { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    if(localStorage.getItem('token')){
      this.token = JSON.parse(localStorage.getItem('token'));
      //localStorage.removeItem('token');
    }
    this.getSystems();
  }

  signOut(){
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToProjects(systemUrl){
    //this.router.navigate(['/shocklogic/projects']);
    //window.location.href = 'https://dev.shocklogic.com/v2/projectList';
    window.location.href = systemUrl;
  }

  getSystems(){
    //LICENSE: is to handle if the user has a paid license or not from the system.
      //We handle it with the value with the name of the system. 
    //The user can still login but we will show a message that he is without a license to contact Shocklogic support
    //ACTIVE: we use it to show or not the system. 
      //It is with this value that we are going to deactivate the system. 
    //We handle this value with the System Status.
    this.systems = [
      { name: 'Abstractlogic', icon: 'https://dev.shocklogic.com/v2/img/unified-login/abstractlogic.png', url: 'https://dev.shocklogic.com/v2/projectList',
        license: this.user.systems.AbstractLogic, active: this.user.systems.AbstractlogicStatus },
      /*{ name: 'Exhibitorlogic', icon: 'assets/exhibitorlogic.png',
      license: this.user.systems.Exhibitorlogic, active: this.user.systems.ExhibitorlogicStatus },*/
      /*{ name: 'Leadlogic', icon: 'assets/leadlogic.png',
      license: this.user.systems.LeadlogicMobile, active: this.user.systems.LeadlogicMobileStatus },*/
      { name: 'Memberlogic', icon: 'https://dev.shocklogic.com/v2/img/unified-login/memberlogic.png', url: 'https://dev.shocklogic.com/v2/projectList',
      license: this.user.systems.Memberlogic, active: this.user.systems.MemberlogicStatus },
      /*{ name: 'Mobilelogic', icon: 'assets/mobilelogic.png',
      license: this.user.systems.Mobilelogic, active: this.user.systems.MobilelogicStatus },*/
      /*{ name: 'Onsitelogic', icon: 'assets/onsitelogic.png',
      license: this.user.systems.Onsitelogic, active: this.user.systems.OnsitelogicStatus },*/
      { name: 'Official API', icon: 'https://dev.shocklogic.com/v2/img/unified-login/API.png', url: 'https://api.shocklogic.com/',
      license: this.user.systems.API, active: this.user.systems.APIStatus },
      { name: 'Participantlogic', icon: 'https://dev.shocklogic.com/v2/img/unified-login/participantlogic.png', url: 'https://dev.shocklogic.com/v2/projectList',
      license: this.user.systems.ParticipantlogicWeb, active: this.user.systems.ParticipantlogicWebStatus },
      /*{ name: 'Roomlogic', icon: 'assets/roomlogic.png',
      license: this.user.systems.Roomlogic, active: this.user.systems.RoomlogicStatus },*/
      { name: 'Scanlogic', icon: 'https://dev.shocklogic.com/v2/img/unified-login/scanlogic.png', url: 'https://www.mobapplogic.com/devapp/scanlogicmobile-web-group/',
      license: this.user.systems.Scanlogic, active: this.user.systems.ScanlogicStatus },
      { name: 'Surveylogic', icon: 'https://dev.shocklogic.com/v2/img/unified-login/surveylogic.png', url: 'https://www5.shocklogic.com/scripts/surveylogic/',
      license: this.user.systems.Surveylogic, active: this.user.systems.SurveylogicStatus },
    ]
  }

  shareSessionASP(session, systemUrl){
    this.sessionService.shareSessionWithASP(session)
    .subscribe(
      res => {
        //console.log(res);
        this.goToProjects(systemUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

  shareSessionLaravel(session, systemUrl){
    this.sessionService.shareSessionWithLaravel(session)
    .subscribe(
      res => {
        //console.log(res);
        this.goToProjects(systemUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

  shareAllSession(session, systemUrl){
    this.sessionService.shareMultipleSession(session)
    .subscribe(
      res => {
        //console.log(res);
        this.goToProjects(systemUrl);
      },
      err => {
        console.log(err);
      }
    );
  }

  launch(system){
    if(system.license == 0){
      this.openSnackBar('You do not have an active license for this system, please contact Shocklogic support');
    }
    let formData = new FormData();
    formData.append('Client_Id', this.user.clientId);
    formData.append('User_Id', this.user.userId);
    formData.append('First_Name', this.user.firstName);
    formData.append('Family_Name', this.user.familyName);
    formData.append('Token', this.token);
    formData.append('Security_Level', this.user.securityLevel);
    formData.append('System', system.name);
    this.shareSessionLaravel(formData, system.url);
  }

  discover(system){
    //console.log(system);
  }

}
