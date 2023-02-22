import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-edit-crime-report',
  templateUrl: './edit-crime-report.component.html',
  styleUrls: ['./edit-crime-report.component.css']
})
export class EditCrimeReportComponentOrgSuperAdmin implements OnInit {

  reportData: any = []
  showStudentOrgDiv = true
  reportID: any
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
  yearArr = []

  showPublicProperty = false

  criminalHomicideCrimeData: any
  sexualAssaultCrimeData: any
  othersCrimeData: any
  cleryArrestCrimeData: any
  cleryHateCrimesCrimeData: any
  biasCategoryCrimeData: any
  cleryViolenceCrimesCrimeData: any
  depressionCrimeData: any
  anxietyCrimeData: any
  suicidalThoughtsCrimeData: any
  eatingDisorderCrimeData: any
  substanceMisuseCrimeData: any


  reportForm: FormGroup

  constructor(public service: CommonServiceService, public spinner: NgxSpinnerService,
    public helperService: HelperService, public router: Router, public fb: FormBuilder, public route: ActivatedRoute) {
    this.reportID = this.route.snapshot.paramMap.get('id')
    this.getReportDetails()
    this.reportForm = this.fb.group({
      incidentDay: new FormControl('', [Validators.required]),
      incidentMonth: new FormControl('', [Validators.required]),
      incidentYear: new FormControl('', [Validators.required]),
      incidentHours: new FormControl('', [Validators.required]),
      incidentMinutes: new FormControl('', [Validators.required]),
      amPm: new FormControl('', [Validators.required]),
      incidentAddress: new FormControl("", [Validators.required]),
      incidentAddress2: new FormControl("", [Validators.required]),
      incidentCity: new FormControl("", [Validators.required]),
      incidentState: new FormControl("", [Validators.required]),
      incidentZip: new FormControl("", [Validators.required]),
      incidentCountry: new FormControl("USA", [Validators.required]),
      onControlPropOfInst: new FormControl(false),
      onControlStudentOrg: new FormControl(false),
      onControlPublicProperty: new FormControl(false),
      victimFirstName: new FormControl("", [Validators.required]),
      victimLastName: new FormControl("", [Validators.required]),
      victimPhone: new FormControl("", [Validators.required]),
      victimEmail: new FormControl("", [Validators.required]),
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
      nonNegligentSlaughter: new FormControl(false),
      negligentSlaughter: new FormControl(false),
      rape: new FormControl(false),
      pending: new FormControl(false),
      incest: new FormControl(false),
      sRape: new FormControl(false),
      robbery: new FormControl(false),
      AggrAssault: new FormControl(false),
      burglary: new FormControl(false),
      otherArson: new FormControl(false),
      otherMotorTheft: new FormControl(false),
      wLawViolate: new FormControl(false),
      dAbuseViolate: new FormControl(false),
      lLawViolate: new FormControl(false),
      arrestArson: new FormControl(false),
      arrestMotorTheft: new FormControl(false),
      larcencyTheft: new FormControl(false),
      simpleAssault: new FormControl(false),
      intimidation: new FormControl(false),
      desDamage: new FormControl(false),
      race: new FormControl(false),
      gender: new FormControl(false),
      religion: new FormControl(false),
      natOrigin: new FormControl(false),
      sexOrientation: new FormControl(false),
      genderIdentity: new FormControl(false),
      ethnicity: new FormControl(false),
      disability: new FormControl(false),
      domViolence: new FormControl(false),
      datingViolence: new FormControl(false),
      stalking: new FormControl(false),
      threat: new FormControl(false),
      healthRisk: new FormControl(false),
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
      note: new FormControl("")
    })
  }

  time_hour = []
  time_min = []
  checked = false
  showOne = false
  showTwo = false

  ngOnInit(): void {
    for (let i = 0; i <= 24; i++) {
      this.time_hour.push(i)
    }
    for (let i = 0; i <= 60; i++) {
      this.time_min.push(i)
    }
    this.yearArr.push(this.currentYear - 1)
    this.yearArr.push(this.currentYear)
    this.yearArr.push(this.currentYear + 1)
    this.clickMonth(this.reportData.incidentMonth)
    this.getSexAssaultData('criminal_homicide')
    this.getSexAssaultData('sexual_assault')
    this.getSexAssaultData('others')
    this.getSexAssaultData('clery_arrest')
    this.getSexAssaultData('clery_hate_crimes')
    this.getSexAssaultData('bias_category')
    this.getSexAssaultData('clery_violence_crimes')
    this.getSexAssaultData('depression')
    this.getSexAssaultData('anxiety')
    this.getSexAssaultData('suicidal_intent')
    this.getSexAssaultData('eating_disorder')
    this.getSexAssaultData('substance_misuse')
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
          onControlPropOfInst: this.reportData.onControlPropOfInst,
          onControlStudentOrg: this.reportData.onControlStudentOrg,
          victimFirstName: this.reportData.victimFirstName,
          victimLastName: this.reportData.victimLastName,
          victimPhone: this.reportData.victimPhone,
          victimEmail: this.reportData.victimEmail,
          anySuspect: this.reportData.anySuspect,
          suspectName: this.reportData.suspectName,
          suspectPhone: this.reportData.suspectPhone,
          witnessCount: this.reportData.witnessCount,
          witness1Name: this.reportData.witness1Name,
          witness1Contact: this.reportData.witness1Contact,
          witness1Email: this.reportData.witness1Email,
          witness2Name: this.reportData.witness2Name,
          witness2Contact: this.reportData.witness2Contact,
          witness2Email: this.reportData.witness2Email,
          nonNegligentSlaughter: this.reportData.nonNegligentSlaughter,
          negligentSlaughter: this.reportData.negligentSlaughter,
          rape: this.reportData.rape,
          pending: this.reportData.pending,
          incest: this.reportData.incest,
          sRape: this.reportData.sRape,
          robbery: this.reportData.robbery,
          AggrAssault: this.reportData.AggrAssault,
          burglary: this.reportData.burglary,
          otherArson: this.reportData.otherArson,
          otherMotorTheft: this.reportData.otherMotorTheft,
          wLawViolate: this.reportData.wLawViolate,
          dAbuseViolate: this.reportData.dAbuseViolate,
          lLawViolate: this.reportData.lLawViolate,
          arrestArson: this.reportData.arrestArson,
          arrestMotorTheft: this.reportData.arrestMotorTheft,
          larcencyTheft: this.reportData.larcencyTheft,
          simpleAssault: this.reportData.simpleAssault,
          intimidation: this.reportData.intimidation,
          desDamage: this.reportData.desDamage,
          race: this.reportData.race,
          gender: this.reportData.gender,
          religion: this.reportData.religion,
          natOrigin: this.reportData.natOrigin,
          sexOrientation: this.reportData.sexOrientation,
          genderIdentity: this.reportData.genderIdentity,
          ethnicity: this.reportData.ethnicity,
          disability: this.reportData.disability,
          domViolence: this.reportData.domViolence,
          datingViolence: this.reportData.datingViolence,
          stalking: this.reportData.stalking,
          threat: this.reportData.threat,
          healthRisk: this.reportData.healthRisk,
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
          notesSubstanceMisuse: this.reportData.notesSubstanceMisuse,
          note: this.reportData.note
        })
      }
    }, (err) => {
      this.spinner.hide()
      this.helperService.showError(err.message)
    })
  }

  ShowHideDiv() {
    var chkYes = document.getElementById("chkYes") as HTMLInputElement | null;
    var dvtext = document.getElementById("dvtext") as HTMLInputElement | null;;
    if (chkYes != null) {
      dvtext.style.display = chkYes.checked ? "block" : "none";
    }
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

  makeDateArr(max: any) {
    for (let i = 1; i <= max; i++) {
      this.dayArr.push(i);
    }
  }

  onCloseStudentOrg() {
    this.showStudentOrgDiv = false
  }
  onOpenStudentOrg() {
    this.showStudentOrgDiv = true
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
    console.log(this.reportForm.value)
    if (this.reportForm.value.anySuspect == 'false') {
      this.reportForm.patchValue({
        suspectName: "",
        suspectPhone: ""
      })
    }
    if (this.reportForm.value.witnessCount == '0') {
      this.reportForm.patchValue({
        witness1Name: '',
        witness1Contact: '',
        witness1Email: '',
        witness2Name: '',
        witness2Contact: '',
        witness2Email: '',
      })
    }
    if (this.reportForm.value.onControlPropOfInst == "true") {
      this.reportForm.patchValue({
        onControlStudentOrg: false
      })
    }
    this.service.getDataToReviewSubmission(this.reportForm.value)
    this.router.navigate(['/users/review-orgSuperAdmin-submission-report/' + this.reportID])
  }
  onOpenPublicProperty() {
    this.showPublicProperty = true
  }
  onClosePublicProperty() {
    this.showPublicProperty = false
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

}
