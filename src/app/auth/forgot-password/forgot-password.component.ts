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

  forgotPasswordFirstStepForm: FormGroup;
  forgotPasswordSecondStepForm: FormGroup;

  hidePassword = true;
  bForgotPassword = false;
  bFirstStep = false;
  bSecondStep = false;

  clients: any;

  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) { }

  ngOnInit() {

    this.bFirstStep = true;

    this.forgotPasswordFirstStepForm = this.formBuilder.group({
      Email: ['', Validators.required],
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

  checkingInputEmail(forgotPasswordForm){
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm.test(forgotPasswordForm.get('Email').value)){
      return false;
    }
    else{
      //this.forgotPasswordForm.controls['Client_Id'].setValue('');
      return true;
    }
  }

  handleFirstStep(){
    this.bForgotPassword = true;
    if(this.bFirstStep){
      let formData = new FormData();
      formData.append('Email', this.forgotPasswordFirstStepForm.get('Email').value);
      this.sessionService.forgotPassword(formData)
      .subscribe(
        res => {
          let auxRes: any = res;
          console.log(auxRes);
          if(auxRes.state == 200){
            this.bForgotPassword = false;
            this.openSnackBar(auxRes.message);
            return;
          }
          else if(auxRes.state == 201){
            this.forgotPasswordSecondStepForm = this.formBuilder.group({
              Email: [{value: this.forgotPasswordFirstStepForm.get('Email').value, disabled: true}, Validators.required],
              Client_Id: ['', Validators.required]
            });
            this.clients = auxRes.clients;
            this.bFirstStep = false;
            this.bSecondStep = true;
            this.bForgotPassword = false;
          }
        },
        err => {
          let auxErr: any = err;
          this.bForgotPassword = false;
          console.log(auxErr);
          this.openSnackBar(auxErr.message);
        }
      );
    }
  }

  handleSecondStep(){
    this.bForgotPassword = true;
    if(this.bSecondStep){
      let formData = new FormData();
      formData.append('Email', this.forgotPasswordSecondStepForm.get('Email').value);
      formData.append('Client_Id', this.forgotPasswordSecondStepForm.get('Client_Id').value);
      this.sessionService.forgotPassword(formData)
      .subscribe(
        res => {
          let auxRes: any = res;
          console.log(auxRes);
          this.bForgotPassword = false;
          this.openSnackBar(auxRes.message);
          this.forgotPasswordSecondStepForm.reset();
          this.forgotPasswordFirstStepForm.reset();
          this.bSecondStep = false;
          this.bFirstStep = true;
        },
        err => {
          let auxErr: any = err;
          this.bForgotPassword = false;
          console.log(auxErr);
          this.openSnackBar(auxErr.message);
        }
      );
    }
  }

}
