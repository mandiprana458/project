import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-sexual-assault',
  templateUrl: './sexual-assault.component.html',
  styleUrls: ['./sexual-assault.component.css']
})
export class SexualAssaultComponent implements OnInit {
  sexAssaultCrimeData:any;
  crimeType: any;
  public config: PerfectScrollbarConfigInterface = {};


  constructor(private route: ActivatedRoute, public commonService: CommonServiceService,
    public spinner: NgxSpinnerService,
    public helperService: HelperService,
    public _location: Location, public dialogRef: MatDialogRef<SexualAssaultComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.crimeType = this.data.type
    if (this.crimeType){
      this.getSexAssaultData()
    }
  }

  getSexAssaultData(){
    this.spinner.show()
    this.commonService.getAPICall({url:`/crimes/${this.crimeType}`}).subscribe((res)=>{
      this.spinner.hide()
      if (res.status == 200){
        this.sexAssaultCrimeData = res.data.definition
      }
    },(err)=>{
      this.spinner.hide()
      this.helperService.showError(err.message)
    })
  }

  goBack() {
    this.dialogRef.close()
  }
}
