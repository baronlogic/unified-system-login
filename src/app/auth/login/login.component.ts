import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any;

  auxRes: any;

  signInForm: FormGroup;

  hidePassword = true;

  bSignIn = false;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      Client_Id: ['']
    });
    if(localStorage.getItem('userLogged')){
      this.user = JSON.parse(localStorage.getItem('userLogged'));
      if(this.user.id && this.user.clientId && !this.user.projectId){
        //this.goToProjectSelection();
      }
      else if(this.user.id && this.user.clientId && this.user.projectId){
        //this.goToSelectSetup();
      }
    }
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToSystems(){
    this.router.navigate(['/shocklogic/systems']);
  }

  checkingInputEmail(){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(this.signInForm.get('Email').value)){
      return true;
    }
    else{
      this.signInForm.controls['Client_Id'].setValue('');
      return false;
    }
  }

  checkInputClientId(){
    if(this.signInForm.value.Client_Id == ''){
      return true;
    }
    else{
      return false;
    }
  }

  handleSignIn(){
    this.bSignIn = true;

    let formData = new FormData();
    formData.append('email', this.signInForm.get('Email').value);
    formData.append('password', this.signInForm.get('Password').value);

    console.log(this.signInForm.value);

    //If we log in with an email
    if(this.checkingInputEmail()){

      this.usersService.validateUserCredentials(this.signInForm.get('Client_Id').value, formData)
      .subscribe(
        res => {
          this.bSignIn = false;
          console.log(res);
          this.auxRes = res;
          if(this.auxRes.type == 'error'){
            this.openSnackBar(this.auxRes.message);
            return;
          }
          else if(this.auxRes.type == 'success'){
            let auxUser = {
              id: this.auxRes.id,
              clientId: this.auxRes.client_id,
            }
            localStorage.setItem('userLogged', JSON.stringify(auxUser));
            this.openSnackBar('Login successful!');
            this.goToSystems();
          }
        },
        err => {
          this.bSignIn = false;
          console.log(err);
          this.openSnackBar(err.message);
        }
      );
    }

    //If we log in with an username
    else{

      this.usersService.validateUserWithoutClientId(formData)
      .subscribe(
        res => {
          this.bSignIn = false;
          console.log(res);
          this.auxRes = res;
          if(this.auxRes.type == 'error'){
            this.openSnackBar(this.auxRes.message);
            return;
          }
          else if(this.auxRes.type == 'success'){
            let auxUser = {
              id: this.auxRes.id,
              clientId: this.auxRes.client_id,
            }
            localStorage.setItem('userLogged', JSON.stringify(auxUser));
            this.openSnackBar('Login successful!');
            this.goToSystems();
          }
        },
        err => {
          this.bSignIn = false;
          console.log(err);
          this.openSnackBar(err.message);
        }
      );

    }

  }

}
