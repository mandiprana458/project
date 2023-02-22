import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.css']
})
export class AddOrgComponent implements OnInit {

  addOrgForm: FormGroup;
  submitted = false;

  constructor(
    public commonService: CommonServiceService,
    public router: Router,
    public spinner: NgxSpinnerService,
    public helperService: HelperService,
    private fb: FormBuilder
  ) {
    this.addOrgForm = this.fb.group({
      orgName: new FormControl('', [Validators.required]),
      organisationType: new FormControl('K12', [Validators.required]),
      adminName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      fees: new FormControl('', [Validators.required]),
      frequency: new FormControl('MONTHLY', [Validators.required]),
      contact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),]),
    });
  }

  get f() {
    return this.addOrgForm.controls;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true
    if(this.addOrgForm.valid){
      let postData={
        "name":this.addOrgForm.value.orgName,
        "organisationType":this.addOrgForm.value.organisationType,
        "superAdminName":this.addOrgForm.value.adminName,
        "contactEmail":this.addOrgForm.value.email,
        "subscriptionFrequency":this.addOrgForm.value.frequency,
        "address":this.addOrgForm.value.address,
        "contactNumber":this.addOrgForm.value.contact,
        "subscriptionFees":this.addOrgForm.value.fees 
      }
      this.spinner.show()
      this.commonService.postAPICall({url: '/organisations', data: postData}).subscribe((res)=>{
        this.spinner.hide()
      if (res.status == '200'){
        this.helperService.showSuccess(res.message)
        this.router.navigate(['/users/org-list'])
      }
      },(err)=>{
        this.spinner.hide();
        this.helperService.showError(err.error.message)
      })
    }
  }
}
