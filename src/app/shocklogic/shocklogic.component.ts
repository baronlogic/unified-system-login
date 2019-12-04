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
    if(!localStorage.getItem('userLogged')){
      this.signOut();
      return;
    }
    this.user = JSON.parse(localStorage.getItem('userLogged'));
    console.log(this.user);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate([''], { replaceUrl: true });
  }

}
