import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  user_type: any
  org_type: any;
  filterList: any;
  filterListObj = {}

  constructor(public commonService: CommonServiceService,
    public router: Router, public spinner: NgxSpinnerService,
    public helperService: HelperService,
    private fb: FormBuilder) { }

  reportListArr: any[] = []

  ngOnInit(): void {
    this.org_type = localStorage.getItem("organisationType")
    this.user_type = localStorage.getItem('user_type')
    this.getReportList()
    this.getFilterTypes()
  }

  getReportList() {
    this.spinner.show();
    this.commonService.getAPICall({ url: '/organisation/reports' }).subscribe(res => {
      this.spinner.hide()
      if (res.status == '200') {
        this.reportListArr = res.data
      }
      console.log(this.reportListArr)
    }, (err) => {
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
  }

  getFilterTypes() {
    this.spinner.show();
    this.commonService.getAPICall({ url: '/crimes' }).subscribe(res => {
      this.spinner.hide()
      if (res.status == '200') {
        this.filterList = res.data
        this.filterList.forEach(element => {
          this.filterListObj[element.booleanKey] = element.name
        });
      }
    }, (err) => {
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
  }

  filterByCrimeType(value: any) {
    let obj = {}
    obj[value] = true
    this.spinner.show();
    this.commonService.getAPICall({ url: '/organisation/reports', data: obj }).subscribe(res => {
      this.spinner.hide()
      if (res.status == '200') {
        this.reportListArr = res.data
      }
    }, (err) => {
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })

  }

  makeDescription(singleReportData : any){
    let desc = ""
    let singleReportDataKeys = Object.keys(singleReportData)
    singleReportDataKeys.forEach((key)=>{
      if (key in this.filterListObj && singleReportData[key]){
        desc += this.filterListObj[key] + ', '
      }
    })
    return desc
  }

  getDateFromTimestamp(date: any) {
    var d = new Date(date);
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
  }

}
