import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  user: any;
  system: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if(!localStorage.getItem('userLogged')){
      this.signOut();
      return;
    }
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    this.system = JSON.parse(localStorage.getItem('system'));
  }

  signOut(){
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

}
