import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-review-submission-org-super-admin',
  templateUrl: './review-submission-org-super-admin.component.html',
  styleUrls: ['./review-submission-org-super-admin.component.css']
})
export class ReviewSubmissionOrgSuperAdminComponent implements OnInit {

  reviewData: any = []
  reportID: any;

  constructor(public service: CommonServiceService, public spinner: NgxSpinnerService,
    public helperService: HelperService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.reportID = this.route.snapshot.paramMap.get('id')
    this.reviewData = this.service.sendDataToReviewSubmission()
    console.log(this.reviewData)
  }

  onClickFinalSubmit() {
    let payload = {
      "incidentDate": (new Date(this.reviewData.incidentDate).getTime()),
      "incidentHours": this.reviewData.incidentHours,
      "incidentMinutes": this.reviewData.incidentMinutes,
      "incidentAddress": this.reviewData.incidentAddress,
      "incidentAddress2": this.reviewData.incidentAddress2,
      "incidentCity": this.reviewData.incidentCity,
      "incidentState": this.reviewData.incidentState,
      "incidentZip": this.reviewData.incidentZip,
      "incidentCountry": this.reviewData.incidentCountry,
      "onControlPropOfInst": this.reviewData.onControlPropOfInst == 'true' ? true : false,
      "onControlStudentOrg": this.reviewData.onControlStudentOrg == 'true' ? true : false,
      "victimFirstName": this.reviewData.victimFirstName,
      "victimLastName": this.reviewData.victimLastName,
      "victimPhone": this.reviewData.victimPhone,
      "victimEmail": this.reviewData.victimEmail,
      "anySuspect": (this.reviewData.anySuspect ? true : false),
      "suspectName": this.reviewData.suspectName,
      "suspectPhone": this.reviewData.suspectPhone,
      "witnessCount": this.reviewData.witnessCount,
      "witness1Name": this.reviewData.witness1Name,
      "witness1Contact": this.reviewData.witness1Contact,
      "witness1Email": this.reviewData.witness1Email,
      "witness2Name": this.reviewData.witness2Name,
      "witness2Contact": this.reviewData.witness2Contact,
      "witness2Email": this.reviewData.witness2Email,
      "criminalHomicide": {
        "negligentSlaughter": this.reviewData.negligentSlaughter,
        "nonNegligentSlaughter": this.reviewData.nonNegligentSlaughter
      },
      "sexualOffence": {
        "rape": this.reviewData.rape,
        "pending": this.reviewData.pending,
        "incest": this.reviewData.incest,
        "sRape": this.reviewData.sRape
      },
      "others": {
        "robbery": this.reviewData.robbery,
        "aggrAssault": this.reviewData.AggrAssault,
        "burglary": this.reviewData.burglary,
        "arson": this.reviewData.otherArson,
        "motorTheft": this.reviewData.otherMotorTheft
      },
      "arrest": {
        "wLawViolate": this.reviewData.wLawViolate,
        "dAbuseViolate": this.reviewData.dAbuseViolate,
        "lLawViolate": this.reviewData.lLawViolate,
        "arson": this.reviewData.arrestArson,
        "motorTheft": this.reviewData.arrestMotorTheft
      },
      "hateCrime": {
        "larcencyTheft": this.reviewData.larcencyTheft,
        "simpleAssault": this.reviewData.simpleAssault,
        "intimidation": this.reviewData.intimidation,
        "desDamage": this.reviewData.desDamage
      },
      "bCategory": {
        "race": this.reviewData.race,
        "gender": this.reviewData.gender,
        "religion": this.reviewData.religion,
        "natOrigin": this.reviewData.natOrigin,
        "sexOrientation": this.reviewData.sexOrientation,
        "genderIdentity": this.reviewData.genderIdentity,
        "ethnicity": this.reviewData.ethnicity,
        "disability": this.reviewData.disability
      },
      "sexViolence": {
        "domViolence": this.reviewData.domViolence,
        "datingViolence": this.reviewData.datingViolence,
        "stalking": this.reviewData.stalking
      },
      "threat": this.reviewData.threat,
      "healthRisk": this.reviewData.healthRisk,
      "note": this.reviewData.note
    }
    this.spinner.show()
    this.service.patchAPICall({ url: '/organisation/reports/' + this.reportID, data: payload }).subscribe(
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
