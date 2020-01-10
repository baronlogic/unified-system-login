import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {

  user: any;
  systems: any;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private usersService: UsersService
  ) 
  { }

  ngOnInit() {
    if(!localStorage.getItem('userLogged')){
      this.signOut();
      return;
    }
    this.user = JSON.parse(localStorage.getItem('userLogged'));
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
      { name: 'Abstractlogic', icon: 'assets/abstractlogic.png', url: 'https://www5.shocklogic.com/scripts/JMCommon/JMLoginAbsDemo.asp',
        license: this.user.systems.AbstractLogic, active: this.user.systems.AbstractlogicStatus },
      /*{ name: 'Exhibitorlogic', icon: 'assets/exhibitorlogic.png',
      license: this.user.systems.Exhibitorlogic, active: this.user.systems.ExhibitorlogicStatus },*/
      /*{ name: 'Leadlogic', icon: 'assets/leadlogic.png',
      license: this.user.systems.LeadlogicMobile, active: this.user.systems.LeadlogicMobileStatus },*/
      { name: 'Memberlogic', icon: 'assets/memberlogic.png', url: 'https://www5.shocklogic.com/scripts/JMCommon/JMLoginMember.asp',
      license: this.user.systems.Memberlogic, active: this.user.systems.MemberlogicStatus },
      /*{ name: 'Mobilelogic', icon: 'assets/mobilelogic.png',
      license: this.user.systems.Mobilelogic, active: this.user.systems.MobilelogicStatus },*/
      /*{ name: 'Onsitelogic', icon: 'assets/onsitelogic.png',
      license: this.user.systems.Onsitelogic, active: this.user.systems.OnsitelogicStatus },*/
      { name: 'Official API', icon: 'assets/API.png', url: 'https://api.shocklogic.com/',
      license: this.user.systems.API, active: this.user.systems.APIStatus },
      { name: 'Participantlogic', icon: 'assets/participantlogic.png', url: 'https://www5.shocklogic.com/scripts/JMCommon/JMLoginEvtdemo.asp',
      license: this.user.systems.ParticipantlogicWeb, active: this.user.systems.ParticipantlogicWebStatus },
      /*{ name: 'Roomlogic', icon: 'assets/roomlogic.png',
      license: this.user.systems.Roomlogic, active: this.user.systems.RoomlogicStatus },*/
      { name: 'Scanlogic', icon: 'assets/scanlogic.png', url: 'https://www.mobapplogic.com/devapp/scanlogicmobile-web-group/',
      license: this.user.systems.Scanlogic, active: this.user.systems.ScanlogicStatus },
      { name: 'Surveylogic', icon: 'assets/surveylogic.png', url: 'https://www5.shocklogic.com/scripts/surveylogic/',
      license: this.user.systems.Surveylogic, active: this.user.systems.SurveylogicStatus },
    ]
  }

  launch(system){
    if(system.license == 0){
      this.openSnackBar('You do not have an active license for this system, please contact Shocklogic support');
    }
    this.goToProjects(system.url);
  }

  discover(system){
    console.log(system);
  }

}
