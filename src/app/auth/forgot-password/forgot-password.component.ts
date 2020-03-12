import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user: any;

  auxRes: any;

  forgotPasswordForm: FormGroup;

  hidePassword = true;

  bForgotPassword = false;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      Email: ['', Validators.required],
      User_Id: ['', Validators.required],
      Client_Id: ['', Validators.required]
    });
  }

  openSnackBar(message: string){
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  goToSystems(){
    this.router.navigate(['/shocklogic/systems'], { replaceUrl: true });
  }

  checkingInputEmail(){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(this.forgotPasswordForm.get('Email').value)){
      return false;
    }
    else{
      //this.forgotPasswordForm.controls['Client_Id'].setValue('');
      return true;
    }
  }

  handleSignIn(){
    this.bForgotPassword = true;

    let formData = new FormData();
    formData.append('Email', this.forgotPasswordForm.get('Email').value);
    formData.append('User_Id', this.forgotPasswordForm.get('User_Id').value);
    formData.append('Client_Id', this.forgotPasswordForm.get('Client_Id').value);

    console.log(this.forgotPasswordForm.value);

    this.sessionService.forgotPassword(formData)
    .subscribe(
      res => {
        this.bForgotPassword = false;
        this.openSnackBar(JSON.stringify(res));
      },
      err => {
        this.bForgotPassword = false;
        this.openSnackBar(JSON.stringify(err));
      }
    );
  }

}
