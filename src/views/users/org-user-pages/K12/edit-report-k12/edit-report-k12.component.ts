import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { ValidatorService } from 'src/shared/crime-report-validations/crimeReportValidation';

@Component({
  selector: 'app-edit-report-k12',
  templateUrl: './edit-report-k12.component.html',
  styleUrls: ['./edit-report-k12.component.css']
})
export class EditReportK12Component implements OnInit {

  submitted = false
  reportForm: FormGroup
  showStudentOrgDiv = false;
  showOtherNameBox = false;
  currentYear = new Date().getFullYear()
  dayArr = []
  monthArr = [
    { name: "JANUARY", noOfDay: 31 },
    { name: "FEBRUARY", noOfDay: 29 },
    { name: "MARCH", noOfDay: 31 },
    { name: "APRIL", noOfDay: 30 },
    { name: "MAY", noOfDay: 31 },
    { name: "JUNE", noOfDay: 30 },
    { name: "JULY", noOfDay: 31 },
    { name: "AUGUST", noOfDay: 31 },
    { name: "SEPTEMBER", noOfDay: 30 },
    { name: "OCTOBER", noOfDay: 31 },
    { name: "NOVEMBER", noOfDay: 30 },
    { name: "DECEMBER", noOfDay: 31 }
  ]

  criminalHomicideCrimeData: any
  sexualAssaultCrimeData: any
  othersCrimeData: any
  cleryArrestCrimeData: any
  cleryHateCrimesCrimeData: any
  biasCategoryCrimeData: any
  cleryViolenceCrimesCrimeData: any
  depressionCrimeData:any
  anxietyCrimeData:any
  suicidalThoughtsCrimeData:any
  eatingDisorderCrimeData:any
  substanceMisuseCrimeData:any

  yearArr = []
  reportData: any = []

  constructor(public fb: FormBuilder, public validatorService: ValidatorService, public router: Router, public spinner: NgxSpinnerService, public service: CommonServiceService, public dialog: MatDialog, public helperService: HelperService) {
    this.getForm()
  }

  getSexAssaultData(type: any) {
    this.spinner.show()
    this.service.getAPICall({ url: `/crimes/${type}` }).subscribe((res) => {
      this.spinner.hide()
      if (res.status == 200) {
        if (type == 'criminal_homicide') {
          this.criminalHomicideCrimeData = res.data.definition
        }
        if (type == 'sexual_assault') {
          this.sexualAssaultCrimeData = res.data.definition
        }
        if (type == 'others') {
          this.othersCrimeData = res.data.definition
        }
        if (type == 'clery_arrest') {
          this.cleryArrestCrimeData = res.data.definition
        }
        if (type == 'clery_hate_crimes') {
          this.cleryHateCrimesCrimeData = res.data.definition
        }
        if (type == 'bias_category') {
          this.biasCategoryCrimeData = res.data.definition
        }
        if (type == 'clery_violence_crimes') {
          this.cleryViolenceCrimesCrimeData = res.data.definition
        }
        if (type == 'depression') {
          this.depressionCrimeData = res.data.definition
        }
        if (type == 'anxiety') {
          this.anxietyCrimeData = res.data.definition
        }
        if (type == 'suicidal_intent') {
          this.suicidalThoughtsCrimeData = res.data.definition
        }
        if (type == 'eating_disorder') {
          this.eatingDisorderCrimeData = res.data.definition
        }
        if (type == 'substance_misuse') {
          this.substanceMisuseCrimeData = res.data.definition
        }
      }
    }, (err) => {
      this.spinner.hide()
      this.helperService.showError(err.message)
    })
  }

  getForm() {
    this.reportForm = this.fb.group({
      happenedToWhom: new FormControl(false),
      elsesName: new FormControl(""),
      // incidentDate: new FormControl("", [Validators.required]),
      incidentDay: new FormControl('', [Validators.required]),
      incidentMonth: new FormControl('', [Validators.required]),
      incidentYear: new FormControl('', [Validators.required]),
      incidentHours: new FormControl('', [Validators.required]),
      incidentMinutes: new FormControl('', [Validators.required]),
      amPm: new FormControl('', [Validators.required]),
      incidentAddress: new FormControl("", [Validators.required]),
      incidentAddress2: new FormControl(""),
      incidentCity: new FormControl("", [Validators.required]),
      incidentState: new FormControl("", [Validators.required]),
      incidentZip: new FormControl("", [Validators.required]),
      incidentCountry: new FormControl("USA", [Validators.required]),
      anySuspect: new FormControl(false),
      suspectName: new FormControl(""),
      suspectPhone: new FormControl(""),
      witnessCount: new FormControl(""),
      witness1Name: new FormControl(""),
      witness1Contact: new FormControl(""),
      witness1Email: new FormControl(""),
      witness2Name: new FormControl(""),
      witness2Contact: new FormControl(""),
      witness2Email: new FormControl(""),
      physicalBullying: new FormControl(false),
      verbalBullying: new FormControl(false),
      cyberBullying: new FormControl(false),
      otherBullying: new FormControl(false),
      bullyingDescription: new FormControl(""),
      threatToSchool: new FormControl(false),
      threatToStudent: new FormControl(false),
      threatToTeacher: new FormControl(false),
      threatToYou: new FormControl(false),
      threatToOthers: new FormControl(false),
      threatDescription: new FormControl(""),
      covid: new FormControl(false),
      flu: new FormControl(false),
      fever: new FormControl(false),
      otherHealth: new FormControl(false),
      healthDescription: new FormControl(""),
      unusualBehaviour: new FormControl(false),
      vehichleDrivingSlowly: new FormControl(false),
      leavingOfItem: new FormControl(false),
      randomActivity: new FormControl(false),
      otherSuspiciousActivity: new FormControl(false),
      suspiciousDescription: new FormControl(""),
      sexualComments: new FormControl(false),
      sexualAdvances: new FormControl(false),
      cyberHarrassment: new FormControl(false),
      sexualFavours: new FormControl(false),
      flashing: new FormControl(false),
      peeping: new FormControl(false),
      stalking: new FormControl(false),
      sexualRumours: new FormControl(false),
      gripPull: new FormControl(false),
      otherSexualActivity: new FormControl(false),
      sexualActDescription: new FormControl(""),
      sadnessDepression: new FormControl(false),
      hisroryDepression: new FormControl(false),
      hopelessDepression: new FormControl(false),
      suicidalDepression: new FormControl(false),
      lowEnergyDepression: new FormControl(false),
      failureDepression: new FormControl(false),
      notesDepression: new FormControl(""),
      dailyAnxiety: new FormControl(false),
      concentrationAnxiety: new FormControl(false),
      fearAnxiety: new FormControl(false),
      unsocialAnxiety: new FormControl(false),
      healthAnxiety: new FormControl(false),
      interferingAnxiety: new FormControl(false),
      notesAnxiety: new FormControl(""),
      deadwishSuicide: new FormControl(false),
      nonSpecificReasonSuicide: new FormControl(false),
      nospecificReasonSuicide: new FormControl(false),
      specificReasonSuicide: new FormControl(false),
      behaviourSuicide: new FormControl(false),
      notesSuicide: new FormControl(""),
      refuseEatDisorder: new FormControl(false),
      publicEatDisorder: new FormControl(false),
      caloriesEatDisorder: new FormControl(false),
      breakingEatDisorder: new FormControl(false),
      bodyShapeEatDisorder: new FormControl(false),
      vomitEatDisorder: new FormControl(false),
      notesEatDisorder: new FormControl(""),
      drugsNASubstanceMisuse: new FormControl(false),
      drinkSubstanceMisuse: new FormControl(false),
      friendsSubstanceMisuse: new FormControl(false),
      concernSubstanceMisuse: new FormControl(false),
      relativesSubstanceMisuse: new FormControl(false),
      struggleSubstanceMisuse: new FormControl(false),
      alcoholSubstanceMisuse: new FormControl(false),
      decidedSubstanceMisuse: new FormControl(false),
      lifeSubstanceMisuse: new FormControl(false),
      upsetSubstanceMisuse: new FormControl(false),
      notesSubstanceMisuse: new FormControl(""),
    })
  }

  get f() {
    return this.reportForm.controls
  }

  time_hour = []
  time_min = []
  checked = false
  showOne = false
  showTwo = false

  ngOnInit(): void {
    for (let i = 1; i <= 12; i++) {
      this.time_hour.push(i)
    }
    for (let i = 0; i <= 59; i++) {
      this.time_min.push(i)
    }
    this.yearArr.push(this.currentYear - 1)
    this.yearArr.push(this.currentYear)
    this.yearArr.push(this.currentYear + 1)
    this.reportData = this.service.sendDataToReviewSubmission()
    console.log(this.reportData)
    this.clickMonth(this.reportData.incidentMonth)
    if (this.reportData.happenedToYou == true) {
      this.reportForm.patchValue({
        happenedToWhom: "true",
        elsesName: ""
      })
    }
    if (this.reportData.happenedToElse == true) {
      this.reportForm.patchValue({
        happenedToWhom: "false",
        elsesName: this.reportData.elsesName,
      })
    }
    this.reportForm.patchValue({
      incidentDay: parseInt(this.reportData.incidentDay),
      incidentMonth: this.reportData.incidentMonth,
      incidentYear: parseInt(this.reportData.incidentYear),
      incidentHours: parseInt(this.reportData.incidentHours),
      incidentMinutes: parseInt(this.reportData.incidentMinutes),
      amPm: this.reportData.amPm,
      incidentAddress: this.reportData.incidentAddress,
      incidentAddress2: this.reportData.incidentAddress2,
      incidentCity: this.reportData.incidentCity,
      incidentState: this.reportData.incidentState,
      incidentZip: this.reportData.incidentZip,
      incidentCountry: this.reportData.incidentCountry,
      anySuspect: this.reportData.anySuspect ? 'true' : 'false',
      suspectName: this.reportData.suspectName,
      suspectPhone: this.reportData.suspectPhone,
      witnessCount: '' + this.reportData.witnessCount,
      witness1Name: this.reportData.witness1Name,
      witness1Contact: this.reportData.witness1Contact,
      witness1Email: this.reportData.witness1Email,
      witness2Name: this.reportData.witness2Name,
      witness2Contact: this.reportData.witness2Contact,
      witness2Email: this.reportData.witness2Email,
      physicalBullying: this.reportData.physicalBullying,
      verbalBullying: this.reportData.verbalBullying,
      cyberBullying: this.reportData.cyberBullying,
      otherBullying: this.reportData.otherBullying,
      bullyingDescription: this.reportData.bullyingDescription,
      threatToSchool: this.reportData.threatToSchool,
      threatToStudent: this.reportData.threatToStudent,
      threatToTeacher: this.reportData.threatToTeacher,
      threatToYou: this.reportData.threatToYou,
      threatToOthers: this.reportData.threatToOthers,
      threatDescription: this.reportData.threatDescription,
      covid: this.reportData.covid,
      flu: this.reportData.flu,
      fever: this.reportData.fever,
      otherHealth: this.reportData.otherHealth,
      healthDescription: this.reportData.healthDescription,
      unusualBehaviour: this.reportData.unusualBehaviour,
      vehichleDrivingSlowly: this.reportData.vehichleDrivingSlowly,
      leavingOfItem: this.reportData.leavingOfItem,
      randomActivity: this.reportData.randomActivity,
      otherSuspiciousActivity: this.reportData.otherSuspiciousActivity,
      suspiciousDescription: this.reportData.suspiciousDescription,
      sexualComments: this.reportData.sexualComments,
      sexualAdvances: this.reportData.sexualAdvances,
      cyberHarrassment: this.reportData.cyberHarrassment,
      sexualFavours: this.reportData.sexualFavours,
      flashing: this.reportData.flashing,
      peeping: this.reportData.peeping,
      stalking: this.reportData.stalking,
      sexualRumours: this.reportData.sexualRumours,
      gripPull: this.reportData.gripPull,
      otherSexualActivity: this.reportData.otherSexualActivity,
      sexualActDescription: this.reportData.sexualActDescription,
      sadnessDepression: this.reportData.sadnessDepression,
      hisroryDepression: this.reportData.hisroryDepression,
      hopelessDepression: this.reportData.hopelessDepression,
      suicidalDepression: this.reportData.suicidalDepression,
      lowEnergyDepression: this.reportData.lowEnergyDepression,
      failureDepression: this.reportData.failureDepression,
      notesDepression: this.reportData.notesDepression,
      dailyAnxiety: this.reportData.dailyAnxiety,
      concentrationAnxiety: this.reportData.concentrationAnxiety,
      fearAnxiety: this.reportData.fearAnxiety,
      unsocialAnxiety: this.reportData.unsocialAnxiety,
      healthAnxiety: this.reportData.healthAnxiety,
      interferingAnxiety: this.reportData.interferingAnxiety,
      notesAnxiety: this.reportData.notesAnxiety,
      deadwishSuicide: this.reportData.deadwishSuicide,
      nonSpecificReasonSuicide: this.reportData.nonSpecificReasonSuicide,
      nospecificReasonSuicide: this.reportData.nospecificReasonSuicide,
      specificReasonSuicide: this.reportData.specificReasonSuicide,
      behaviourSuicide: this.reportData.behaviourSuicide,
      notesSuicide: this.reportData.notesSuicide,
      refuseEatDisorder: this.reportData.refuseEatDisorder,
      publicEatDisorder: this.reportData.publicEatDisorder,
      caloriesEatDisorder: this.reportData.caloriesEatDisorder,
      breakingEatDisorder: this.reportData.breakingEatDisorder,
      bodyShapeEatDisorder: this.reportData.bodyShapeEatDisorder,
      vomitEatDisorder: this.reportData.vomitEatDisorder,
      notesEatDisorder: this.reportData.notesEatDisorder,
      drugsNASubstanceMisuse: this.reportData.drugsNASubstanceMisuse,
      drinkSubstanceMisuse: this.reportData.drinkSubstanceMisuse,
      friendsSubstanceMisuse: this.reportData.friendsSubstanceMisuse,
      concernSubstanceMisuse: this.reportData.concernSubstanceMisuse,
      relativesSubstanceMisuse: this.reportData.relativesSubstanceMisuse,
      struggleSubstanceMisuse: this.reportData.struggleSubstanceMisuse,
      alcoholSubstanceMisuse: this.reportData.alcoholSubstanceMisuse,
      decidedSubstanceMisuse: this.reportData.decidedSubstanceMisuse,
      lifeSubstanceMisuse: this.reportData.lifeSubstanceMisuse,
      upsetSubstanceMisuse: this.reportData.upsetSubstanceMisuse,
      notesSubstanceMisuse: this.reportData.notesSubstanceMisuse
    })
    
    this.getSexAssaultData('depression')
    this.getSexAssaultData('anxiety')
    this.getSexAssaultData('suicidal_intent')
    this.getSexAssaultData('eating_disorder')
    this.getSexAssaultData('substance_misuse')
  }

  clickMonth(month: any) {
    console.log(month)
    this.dayArr = []
    if (month != "") {
      let noOfDay = this.monthArr.find(x => x.name === month).noOfDay
      console.log(noOfDay)
      this.makeDateArr(noOfDay)
    }
  }
  onOpenNameBox() {
    this.showOtherNameBox = true
  }
  onCloseNameBox() {
    this.showOtherNameBox = false
  }
  makeDateArr(max: any) {
    for (let i = 1; i <= max; i++) {
      this.dayArr.push(i);
    }
  }

  ShowHideDiv() {
    var chkYes = document.getElementById("chkYes") as HTMLInputElement | null;
    var dvtext = document.getElementById("dvtext") as HTMLInputElement | null;
    if (chkYes != null) {
      dvtext.style.display = chkYes.checked ? "block" : "none";
    }
  }

  onClickWitnessRadio() {
    var rates = (<HTMLInputElement>document.querySelector('input[name="witnessCount"]:checked')).value;
    if (rates == '0') {
      this.showOne = false
      this.showTwo = false
    } else if (rates == '1') {
      this.showOne = true
      this.showTwo = false
    } else {
      this.showOne = true
      this.showTwo = true
    }
  }

  onSubmit() {
    if (this.reportForm.value.happenedToWhom == 'true') {
      this.reportForm.addControl('happenedToYou', this.fb.control(true))
      this.reportForm.addControl('happenedToElse', this.fb.control(false))
    } else if (this.reportForm.value.happenedToWhom == 'false') {
      this.reportForm.addControl('happenedToYou', this.fb.control(false))
      this.reportForm.addControl('happenedToElse', this.fb.control(true))
    }
    this.reportForm.removeControl('happenedToWhom')
    console.log(this.reportForm.value)
    this.submitted = true
    if (this.validatorService.createK12ReportValidations(this.reportForm.value)) {
      console.log("submit loop passed")
      this.service.getDataToReviewSubmission(this.reportForm.value)
      this.router.navigate(['/users/review-submission-report-k12'])
    }
  }

}
