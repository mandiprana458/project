import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { ValidatorService } from 'src/shared/crime-report-validations/crimeReportValidation';

@Component({
  selector: 'app-edit-k12-crime-report',
  templateUrl: './edit-k12-crime-report.component.html',
  styleUrls: ['./edit-k12-crime-report.component.css']
})
export class EditK12CrimeReportComponent implements OnInit {

  reportID: any
  reportData: any = []
  submitted = false
  showOtherNameBox = false;
  reportForm: FormGroup
  showStudentOrgDiv = false
  currentYear = new Date().getFullYear()
  dayArr = []
  monthArr = [
    {name: "JANUARY", noOfDay: 31},
    {name: "FEBRUARY", noOfDay: 29},
    {name: "MARCH", noOfDay: 31},
    {name: "APRIL", noOfDay: 30},
    {name: "MAY", noOfDay: 31},
    {name: "JUNE", noOfDay: 30},
    {name: "JULY", noOfDay: 31},
    {name: "AUGUST", noOfDay: 31},
    {name: "SEPTEMBER", noOfDay: 30},
    {name: "OCTOBER", noOfDay: 31},
    {name: "NOVEMBER", noOfDay: 30},
    {name: "DECEMBER", noOfDay: 31}
  ]
  yearArr = []

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

  constructor(public service: CommonServiceService, public spinner: NgxSpinnerService, public validatorService: ValidatorService,
    public helperService: HelperService, public router: Router, public fb: FormBuilder, public route: ActivatedRoute) {
    this.reportID = this.route.snapshot.paramMap.get('id')
    this.getReportDetails()
    this.getForm()
  }

  getForm(){
    this.reportForm = this.fb.group({
      happenedToWhom: this.reportData.sexualActDescription,
      elsesName: new FormControl(""),
      // incidentDate: new FormControl("", [Validators.required]),
      incidentDay: new FormControl("", [Validators.required]),
      incidentMonth: new FormControl("", [Validators.required]),
      incidentYear: new FormControl("", [Validators.required]),
      incidentHours: new FormControl(0, [Validators.required]),
      incidentMinutes: new FormControl(0, [Validators.required]),
      amPm: new FormControl("AM", [Validators.required]),
      incidentAddress: new FormControl("", [Validators.required]),
      incidentAddress2: new FormControl(""),
      incidentCity: new FormControl("", [Validators.required]),
      incidentState: new FormControl("", [Validators.required]),
      incidentZip: new FormControl("", [Validators.required]),
      incidentCountry: new FormControl("USA", [Validators.required]),
      anySuspect: this.reportData.sexualActDescription,
      suspectName: new FormControl(""),
      suspectPhone: new FormControl(""),
      witnessCount: new FormControl(""),
      witness1Name: new FormControl(""),
      witness1Contact: new FormControl(""),
      witness1Email: new FormControl(""),
      witness2Name: new FormControl(""),
      witness2Contact: new FormControl(""),
      witness2Email: new FormControl(""),
      physicalBullying: this.reportData.sexualActDescription,
      verbalBullying: this.reportData.sexualActDescription,
      cyberBullying: this.reportData.sexualActDescription,
      otherBullying: this.reportData.sexualActDescription,
      bullyingDescription: new FormControl(""),
      threatToSchool: this.reportData.sexualActDescription,
      threatToStudent: this.reportData.sexualActDescription,
      threatToTeacher: this.reportData.sexualActDescription,
      threatToYou: this.reportData.sexualActDescription,
      threatToOthers: this.reportData.sexualActDescription,
      threatDescription: new FormControl(""),
      covid: this.reportData.sexualActDescription,
      flu: this.reportData.sexualActDescription,
      fever: this.reportData.sexualActDescription,
      otherHealth: this.reportData.sexualActDescription,
      healthDescription: new FormControl(""),
      unusualBehaviour: this.reportData.sexualActDescription,
      vehichleDrivingSlowly: this.reportData.sexualActDescription,
      leavingOfItem: this.reportData.sexualActDescription,
      randomActivity: this.reportData.sexualActDescription,
      otherSuspiciousActivity: this.reportData.sexualActDescription,
      suspiciousDescription: new FormControl(""),
      sexualComments: this.reportData.sexualActDescription,
      sexualAdvances: this.reportData.sexualActDescription,
      cyberHarrassment: this.reportData.sexualActDescription,
      sexualFavours: this.reportData.sexualActDescription,
      flashing: this.reportData.sexualActDescription,
      peeping: this.reportData.sexualActDescription,
      stalking: this.reportData.sexualActDescription,
      sexualRumours: this.reportData.sexualActDescription,
      gripPull: this.reportData.sexualActDescription,
      otherSexualActivity: this.reportData.sexualActDescription,
      sexualActDescription: new FormControl(""),
      sadnessDepression: this.reportData.sexualActDescription,
      hisroryDepression: this.reportData.sexualActDescription,
      hopelessDepression: this.reportData.sexualActDescription,
      suicidalDepression: this.reportData.sexualActDescription,
      lowEnergyDepression: this.reportData.sexualActDescription,
      failureDepression: this.reportData.sexualActDescription,
      notesDepression: new FormControl(""),
      dailyAnxiety: this.reportData.sexualActDescription,
      concentrationAnxiety: this.reportData.sexualActDescription,
      fearAnxiety: this.reportData.sexualActDescription,
      unsocialAnxiety: this.reportData.sexualActDescription,
      healthAnxiety: this.reportData.sexualActDescription,
      interferingAnxiety: this.reportData.sexualActDescription,
      notesAnxiety: new FormControl(""),
      deadwishSuicide: this.reportData.sexualActDescription,
      nonSpecificReasonSuicide: this.reportData.sexualActDescription,
      nospecificReasonSuicide: this.reportData.sexualActDescription,
      specificReasonSuicide: this.reportData.sexualActDescription,
      behaviourSuicide: this.reportData.sexualActDescription,
      notesSuicide: new FormControl(""),
      refuseEatDisorder: this.reportData.sexualActDescription,
      publicEatDisorder: this.reportData.sexualActDescription,
      caloriesEatDisorder: this.reportData.sexualActDescription,
      breakingEatDisorder: this.reportData.sexualActDescription,
      bodyShapeEatDisorder: this.reportData.sexualActDescription,
      vomitEatDisorder: this.reportData.sexualActDescription,
      notesEatDisorder: new FormControl(""),
      drugsNASubstanceMisuse: this.reportData.sexualActDescription,
      drinkSubstanceMisuse: this.reportData.sexualActDescription,
      friendsSubstanceMisuse: this.reportData.sexualActDescription,
      concernSubstanceMisuse: this.reportData.sexualActDescription,
      relativesSubstanceMisuse: this.reportData.sexualActDescription,
      struggleSubstanceMisuse: this.reportData.sexualActDescription,
      alcoholSubstanceMisuse: this.reportData.sexualActDescription,
      decidedSubstanceMisuse: this.reportData.sexualActDescription,
      lifeSubstanceMisuse: this.reportData.sexualActDescription,
      upsetSubstanceMisuse: this.reportData.sexualActDescription,
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
    this.makeDateArr(31)
    this.yearArr.push(this.currentYear - 1)
    this.yearArr.push(this.currentYear)
    this.yearArr.push(this.currentYear + 1)

    this.getSexAssaultData('depression')
    this.getSexAssaultData('anxiety')
    this.getSexAssaultData('suicidal_intent')
    this.getSexAssaultData('eating_disorder')
    this.getSexAssaultData('substance_misuse')
  }

  clickMonth(month: any){
    console.log(month)
    this.dayArr = []
    if(month!=""){
      let noOfDay = this.monthArr.find(x => x.name === month).noOfDay
      console.log(noOfDay)
      this.makeDateArr(noOfDay)
    }
  }

  makeDateArr(max:any){
    for (let i = 1; i<=max; i++){
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

  getReportDetails() {
    this.spinner.show()
    this.service.getAPICall({ url: '/organisation/reports/' + this.reportID }).subscribe((res) => {
      this.spinner.hide()
      if (res.status == 200) {
        res.data[0].incidentDate = (new Date(res.data[0].incidentDate).getTime())
        this.reportData = res.data[0]
        if (this.reportData.onControlPropOfInst == false) {
          this.showStudentOrgDiv = true
        } else {
          this.showStudentOrgDiv = false
        }
        var dvtext = document.getElementById("dvtext") as HTMLInputElement | null;
        if (this.reportData.anySuspect == true) {
          dvtext.style.display = "block";
        } else {
          dvtext.style.display = "none";
        }
        if (this.reportData.witnessCount == '0') {
          this.showOne = false
          this.showTwo = false
        } else if (this.reportData.witnessCount == '1') {
          this.showOne = true
          this.showTwo = false
        } else {
          this.showOne = true
          this.showTwo = true
        }
        console.log(this.reportData)
        if(this.reportData.happenedToYou == true){
          this.reportForm.patchValue({
            happenedToWhom: "true",
            elsesName: ""
          })
        }
        if(this.reportData.happenedToElse == true){
          this.reportForm.patchValue({
            happenedToWhom: "false",
            elsesName: this.reportData.elsesName,
          })
        }     
        this.reportForm.patchValue({
          incidentDay: this.reportData.incidentDay,
          incidentMonth: this.reportData.incidentMonth,
          incidentYear: this.reportData.incidentYear,
          incidentHours: this.reportData.incidentHours,
          incidentMinutes: this.reportData.incidentMinutes,
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
          notesSuicide:  this.reportData.notesSuicide,
          refuseEatDisorder: this.reportData.refuseEatDisorder,
          publicEatDisorder: this.reportData.publicEatDisorder,
          caloriesEatDisorder: this.reportData.caloriesEatDisorder,
          breakingEatDisorder: this.reportData.breakingEatDisorder,
          bodyShapeEatDisorder: this.reportData.bodyShapeEatDisorder,
          vomitEatDisorder: this.reportData.vomitEatDisorder,
          notesEatDisorder:  this.reportData.notesEatDisorder,
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
          notesSubstanceMisuse:  this.reportData.notesSubstanceMisuse
        })
      }
    }, (err) => {
      this.spinner.hide()
      this.helperService.showError(err.message)
    })
  }

  onOpenNameBox(){
    this.showOtherNameBox = true
  }
  onCloseNameBox(){
    this.showOtherNameBox = false
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

  onSubmit(){
    if (this.reportForm.value.anySuspect == 'false'){
      this.reportForm.patchValue({
        suspectName:  "",
        suspectPhone: ""
      })
    }
    if (this.reportForm.value.witnessCount == '0'){
      this.reportForm.patchValue({
        witness1Name:  '',
        witness1Contact:  '',
        witness1Email: '',
        witness2Name: '',
        witness2Contact: '',
        witness2Email: '',
      })
    }
    if (this.reportForm.value.happenedToWhom == 'true'){
      this.reportForm.addControl('happenedToYou', this.fb.control(true))
      this.reportForm.addControl('happenedToElse', this.fb.control(false))
    } else if (this.reportForm.value.happenedToWhom == 'false'){
      this.reportForm.addControl('happenedToYou', this.fb.control(false))
      this.reportForm.addControl('happenedToElse', this.fb.control(true))
    } 
    this.reportForm.removeControl('happenedToWhom')
    console.log(this.reportForm.value)
    this.submitted = true
    if (this.validatorService.createK12ReportValidations(this.reportForm.value)) {
      console.log("submit loop passed")
      this.service.getDataToReviewSubmission(this.reportForm.value)
      this.router.navigate(['/users/review-orgSuperAdmin-submission-report-k12/'+ this.reportID])
    }
  }

}
