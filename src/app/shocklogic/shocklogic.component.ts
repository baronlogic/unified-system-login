import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shocklogic',
  templateUrl: './shocklogic.component.html',
  styleUrls: ['./shocklogic.component.scss']
})
export class ShocklogicComponent implements OnInit {

  user: any;

  constructor(
    private router: Router
  ) 
  { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userLogged'));
  }

  signOut(){
    //localStorage.clear();
    localStorage.removeItem('userLogged');
    localStorage.removeItem('token');
    this.router.navigate([''], { replaceUrl: true });
  }

  goToMyAccount(){
    window.location.href = 'https://dev.shocklogic.com/v2/accounts/myAccount';
  }

  goToUsers(){
    window.location.href = 'https://dev.shocklogic.com/scripts/usermanagement/listUsers.asp?txtJMUser_Id='+this.user.userId+'&qryCategory='+this.user.clientId+'&System_Id=2&bOK=List+of+Users';
  }

  goToClients(){
    window.location.href = 'https://dev.shocklogic.com/scripts/usermanagement/listClients.asp?txtJMUser_Id='+this.user.userId+'&qryCategory='+this.user.clientId+'&System_Id=2&bOK=List+of+Clients';
  }

  goToAPI(){
    window.location.href = 'https://dev.shocklogic.com/scripts/usermanagement/apiSetup.php?txtJMUser_Id='+this.user.userId+'&qryCategory='+this.user.clientId+'&System_Id=2&bOK=API+Setup';
  }

  goToReports(){
    window.open('https://dev.shocklogic.com/reports/ExcelReportsSystemManagement.asp', '_blank');
    //window.location.href = 'https://dev.shocklogic.com/reports/ExcelReportsSystemManagement.asp';
  }

}
