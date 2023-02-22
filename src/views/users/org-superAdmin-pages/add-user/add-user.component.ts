import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;
  submitted = false;

  constructor(
    public commonService: CommonServiceService,
    public router: Router,
    public spinner: NgxSpinnerService,
    public helperService: HelperService,
    private fb: FormBuilder
  ) {
    this.addUserForm = this.fb.group({
      first: new FormControl('', [Validators.required]),
      last: new FormControl('', [Validators.required]),
      role: new FormControl('USER', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),]),
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  onSubmit(){
    this.submitted = true
    if (this.addUserForm.valid){
      let postData={
        "firstName":this.addUserForm.value.first,
        "lastName":this.addUserForm.value.last,
        "email":this.addUserForm.value.email,
        "grade":this.addUserForm.value.grade,
        "dob": new Date(this.addUserForm.value.dob).getTime(),
        "contactNumber":this.addUserForm.value.contact,
        "roleName":this.addUserForm.value.role 
      }
      this.spinner.show()
      this.commonService.postAPICall({url:'/users', data: postData}).subscribe((res)=>{
        this.spinner.hide()
      if (res.status == '200'){
        this.helperService.showSuccess(res.message)
        this.router.navigate(['/users/user-list'])
      }
    },(err)=>{
      this.spinner.hide();
      this.helperService.showError(err.error.message)
      })
    }
  }
  ngOnInit(): void {}
}
