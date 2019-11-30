import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shocklogic',
  templateUrl: './shocklogic.component.html',
  styleUrls: ['./shocklogic.component.scss']
})
export class ShocklogicComponent implements OnInit {

  constructor(
    private router: Router
  ) 
  { }

  ngOnInit() {
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['']);
  }

}
