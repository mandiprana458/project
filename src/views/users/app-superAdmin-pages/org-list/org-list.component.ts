import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})
export class OrgListComponent implements OnInit {

  orgLIstArr: any;
  searchedText: any = "";
  searchedType: any = "";
  payload: {
    contactEmail: "",
    contactNumber: "",
    name: ""
  }

  constructor(public commonService: CommonServiceService,
    public router: Router, public spinner: NgxSpinnerService,
    public helperService: HelperService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getOrgList();
  }

  applyFilter() {
    if (this.searchedText != "") {
      if (this.searchedType == 'Name') {
        this.payload = {
          contactEmail: "",
          contactNumber: "",
          name: this.searchedText
        }
      }
      else if (this.searchedType == 'Email') {
        this.payload = {
          contactEmail: this.searchedText,
          contactNumber: "",
          name: ""
        }
      }
      else if (this.searchedType == 'Contact') {
        this.payload = {
          contactEmail: "",
          contactNumber: this.searchedText,
          name: ""
        }
      }
      else {
        this.searchedText = ""
        this.payload = {
          contactEmail: "",
          contactNumber: "",
          name: ""
        }
      }
      this.getOrgList();
    }
  }

  getOrgList() {
    this.spinner.show();
    this.commonService.getAPICall({ url: '/organisations', data: this.payload }).subscribe(res => {
      this.spinner.hide()
      if (res.status == '200') {
        this.orgLIstArr = res.data
      }
    }, (err) => {
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
  }
}
