import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-reset-token-password',
  templateUrl: './reset-token-password.component.html',
  styleUrls: ['./reset-token-password.component.css']
})
export class ResetTokenPasswordComponent implements OnInit {

  resetForm: FormGroup

  constructor(public commonService: CommonServiceService, 
    public router: Router, public spinner: NgxSpinnerService, 
    public helperService: HelperService,
    private fb: FormBuilder) { 
      this.resetForm = this.fb.group({
        newPassword: new FormControl("",[Validators.required]),
        confirmPassword: new FormControl("",[Validators.required])
      }, { 
        validator: this.ConfirmedValidator('newPassword', 'confirmPassword')
      }) 
    }

    get f(){
      return this.resetForm.controls
    }

  ngOnInit(): void {
  }

  onSubmit(){
    let postdata = {}
    if(this.resetForm.valid){
      postdata = {
        newPassword: this.resetForm.value.newPassword,
        confirmPassword: this.resetForm.value.confirmPassword
      }
      this.spinner.show();
      this.commonService.postAPICall({url: "/reset_password", data: postdata}).subscribe(res => {
        this.spinner.hide()
      if (res){
        this.helperService.showSuccess(res.message);
        this.router.navigate(['/signin'])
      }
    },(err)=>{
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
    }
  }

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
}
