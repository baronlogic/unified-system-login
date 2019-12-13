import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
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

  goToProjects(){
    this.router.navigate(['/shocklogic/projects']);
  }

  getSystems(){
    //LICENSE: is to handle if the user has a paid license or not from the system.
      //We handle it with the value with the name of the system. 
    //The user can still login but we will show a message that he is without a license to contact Shocklogic support
    //ACTIVE: we use it to show or not the system. 
      //It is with this value that we are going to deactivate the system. 
    //We handle this value with the System Status.
    this.systems = [
      { name: 'Abstractlogic', license: this.user.systems.AbstractLogic, active: this.user.systems.AbstractLogicStatus },
      { name: 'Exhibitorlogic', license: this.user.systems.Exhibitorlogic, active: this.user.systems.ExhibitorlogicStatus },
      { name: 'Leadlogic', license: this.user.systems.LeadlogicMobile, active: this.user.systems.LeadlogicMobileStatus },
      { name: 'Memberlogic', license: this.user.systems.Memberlogic, active: this.user.systems.MemberlogicStatus },
      { name: 'Mobilelogic', license: this.user.systems.Mobilelogic, active: this.user.systems.MobilelogicStatus },
      { name: 'Onsitelogic', license: this.user.systems.Onsitelogic, active: this.user.systems.OnsitelogicStatus },
      { name: 'Participantlogic', license: this.user.systems.ParticipantlogicWeb, active: this.user.systems.ParticipantlogicWebStatus },
      { name: 'Roomlogic', license: this.user.systems.Roomlogic, active: this.user.systems.RoomlogicStatus },
      { name: 'Scanlogic', license: this.user.systems.Scanlogic, active: this.user.systems.ScanlogicStatus },
      { name: 'Surveylogic', license: this.user.systems.Surveylogic, active: this.user.systems.SurveylogicStatus },
    ]
  }

  launch(system){
    if(system.license == 0){
      this.openSnackBar('You do not have an active license for this system, please contact Shocklogic support');
    }
    localStorage.setItem('system', JSON.stringify(system));
    this.goToProjects();
  }

  discover(system){
    console.log(system);
  }

}
