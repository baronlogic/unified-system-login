import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {

  user: any;
  systems: any;

  constructor(
    private router: Router
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

  getSystems(){
    this.systems = [
      { oldName: 'Abstractlogic', newName: 'Abstractlogic', status: this.user.systems.AbstractLogic },
      { oldName: 'Exhibitorlogic', newName: 'Exhibition', status: this.user.systems.Exhibitorlogic },
      { oldName: 'LeadlogicMobile', newName: 'LeadlogicMobile', status: this.user.systems.LeadlogicMobile },
      //{ oldName: 'LeadlogicMobileStatus', newName: 'LeadlogicMobileStatus', status: this.user.systems.LeadlogicMobileStatus },
      { oldName: 'Memberlogic', newName: 'Membership', status: this.user.systems.Memberlogic },
      { oldName: 'Mobilelogic', newName: 'Mobilelogic', status: this.user.systems.Mobilelogic },
      //{ oldName: 'MobilelogicStatus', newName: 'MobilelogicStatus', status: this.user.systems.MobilelogicStatus },
      { oldName: 'Onsitelogic', newName: 'Onsitelogic', status: this.user.systems.Onsitelogic },
      //{ oldName: 'OnsitelogicStatus', newName: 'OnsitelogicStatus', status: this.user.systems.OnsitelogicStatus },
      { oldName: 'Participantlogic', newName: 'Participantlogic', status: this.user.systems.Participantlogic },
      //{ oldName: 'ParticipantlogicWeb', newName: 'ParticipantlogicWeb', status: this.user.systems.ParticipantlogicWeb },
      { oldName: 'Roomlogic', newName: 'Roomlogic', status: this.user.systems.Roomlogic },
      //{ oldName: 'RoomlogicStatus', newName: 'RoomlogicStatus', status: this.user.systems.RoomlogicStatus },
      { oldName: 'Scanlogic', newName: 'Scanning', status: this.user.systems.Scanlogic },
      //{ oldName: 'ScanlogicStatus', newName: 'ScanningStatus', status: this.user.systems.ScanlogicStatus },
      { oldName: 'Surveylogic', newName: 'Surveylogic', status: this.user.systems.Surveylogic },
      //{ oldName: 'SurveylogicStatus', newName: 'SurveylogicStatus', status: this.user.systems.SurveylogicStatus }
    ]
  }

  discover($event){
    console.log($event);
  }

}
