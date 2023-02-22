import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-review-org-super-admin-report-k12',
  templateUrl: './review-org-super-admin-report-k12.component.html',
  styleUrls: ['./review-org-super-admin-report-k12.component.css']
})
export class ReviewOrgSuperAdminReportK12Component implements OnInit {

  reviewData: any = []
  reportID: any;

  constructor(public service: CommonServiceService, public spinner: NgxSpinnerService,
    public helperService: HelperService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportID = this.route.snapshot.paramMap.get('id')
    this.reviewData = this.service.sendDataToReviewSubmission()
    console.log(this.reviewData)
  }

  onClickFinalSubmit(){
    this.reviewData.incidentDate = (new Date(this.reviewData.incidentDate).getTime())
    this.reviewData.anySuspect = (this.reviewData.anySuspect == "false") ? false : true
    console.log(this.reviewData)
    this.spinner.show()
    this.service.patchAPICall({ url: '/organisation/reports/' + this.reportID, data: this.reviewData }).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide()
          this.helperService.showSuccess(res.message)
          this.router.navigate(['/users/report-list'])        
        }
        else {
          this.spinner.hide()
          this.helperService.showError(res.message)
        }
      },
      (err) => {
        this.spinner.hide()
        this.helperService.showError(err.error.message)
      }
    )
  }

}
