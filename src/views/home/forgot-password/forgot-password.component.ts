import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/core/services/helper/helper.service';
import { CommonServiceService } from '../../../core/services/common/common-service.service'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email:string;

  constructor(public commonService: CommonServiceService, 
    public router: Router, public spinner: NgxSpinnerService, 
    public helperService: HelperService) { }

  ngOnInit(): void {
  }

  onGetOTP(){
    this.spinner.show();
    let postData = {"email": this.email}
    this.commonService.postAPICall({url:'/send_verification_code', data: postData}).subscribe((res)=>{
      this.spinner.hide()
      if (res.status == '200'){
        this.helperService.showSuccess(res.message);
        localStorage.setItem("reset-email", this.email)
        this.router.navigate(['/reset-password'])
      }
    },(err)=>{
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
  }
}
