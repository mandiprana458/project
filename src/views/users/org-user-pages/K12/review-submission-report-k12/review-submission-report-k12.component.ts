import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-review-submission-report-k12',
  templateUrl: './review-submission-report-k12.component.html',
  styleUrls: ['./review-submission-report-k12.component.css']
})
export class ReviewSubmissionReportK12Component implements OnInit {

  reviewData: any = []

  constructor(public service: CommonServiceService, public spinner: NgxSpinnerService,
    public helperService: HelperService, public router: Router) { }

  ngOnInit(): void {
    this.reviewData = this.service.sendDataToReviewSubmission()
    console.log(this.reviewData)
  }
  onClickFinalSubmit(){
    this.reviewData.incidentDate = (new Date(this.reviewData.incidentDate).getTime())
    this.reviewData.anySuspect = (this.reviewData.anySuspect == "false") ? false : true
    console.log(this.reviewData)
    this.spinner.show()
    this.service.postAPICall({ url: '/organisation/reports', data: this.reviewData }).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide()
          this.helperService.showSuccess(res.message)
          this.router.navigate(['/users/submit-new-report-k12'])
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

  onClickEdit(){
    this.service.getDataToReviewSubmission(this.reviewData)
    this.router.navigate(['/users/edit-submission-report-k12'])
  }

}
