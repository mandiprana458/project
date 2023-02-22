import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html',
  styleUrls: ['./org-details.component.css']
})
export class OrgDetailsComponent implements OnInit {

  user_id: any;
  orgDetailsArr: any;
  fileExtension: any;
  public files: any = [];
  photoName: any;
  public recent_image = "";
  orgDetailsForm: FormGroup;
  bannerColor: any;
  headerColor: any;
  user_type: any;

  constructor(private route: ActivatedRoute, public commonService: CommonServiceService,
    public spinner: NgxSpinnerService,
    public helperService: HelperService,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public _location: Location) {
    this.user_id = atob(this.route.snapshot.paramMap.get('id'))
    this.user_type = localStorage.getItem("user_type")

    this.orgDetailsForm = this.fb.group({
      name: new FormControl(''),
      superAdminName: new FormControl(''),
      address: new FormControl(''),
      contactEmail: new FormControl(''),
      contactNumber: new FormControl(''),
      subscriptionFees: new FormControl(''),
      subscriptionFrequency: new FormControl(''),
      bannerColor: new FormControl(''),
      headerColor: new FormControl(''),
      logo: new FormControl('')
    })
  }

  openEditDialog(type, value): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: { type: type, value: value },
      panelClass: 'comn-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.firedType == 1) {
          this.orgDetailsArr.name = result.editedValue
          this.orgDetailsForm.patchValue({
            name: result.editedValue
          })
        }
        else if (result.firedType == 2) {
          this.orgDetailsArr.superAdminName = result.editedValue
          this.orgDetailsForm.patchValue({
            superAdminName: result.editedValue
          })
        }
        else if (result.firedType == 3) {
          this.orgDetailsArr.address = result.editedValue
          this.orgDetailsForm.patchValue({
            address: result.editedValue
          })
        }
        else if (result.firedType == 4) {
          this.orgDetailsArr.contactNumber = result.editedValue
          this.orgDetailsForm.patchValue({
            contactNumber: result.editedValue
          })
        }
        else if (result.firedType == 5) {
          this.orgDetailsArr.subscriptionFees = parseFloat(result.editedValue);
          this.orgDetailsForm.patchValue({
            subscriptionFees: result.editedValue
          })
        }
        else if (result.firedType == 6) {
          this.orgDetailsArr.subscriptionFrequency = result.editedValue
          this.orgDetailsForm.patchValue({
            subscriptionFrequency: result.editedValue
          })
        }
        else if (result.firedType == 7) {
          this.orgDetailsArr.bannerColor = result.editedValue
          this.bannerColor = this.orgDetailsArr.bannerColor
          this.orgDetailsForm.patchValue({
            bannerColor: result.editedValue
          })
        }
        else if (result.firedType == 8) {
          this.orgDetailsArr.headerColor = result.editedValue
          this.headerColor = this.orgDetailsArr.headerColor
          this.orgDetailsForm.patchValue({
            headerColor: result.editedValue
          })
        }
        else if (result.firedType == 9) {
          this.orgDetailsArr.contactEmail = result.editedValue
          this.orgDetailsForm.patchValue({
            contactEmail: result.editedValue
          })
        }
      }
    });
  }

  ngOnInit(): void {
    this.getOrgDetails()
  }

  getOrgDetails() {
    this.spinner.show()
    this.commonService.getAPICall({ url: `/organisations/${this.user_id}` }).subscribe(
      (res) => {
        this.spinner.hide()
        this.orgDetailsArr = res.data;
        this.orgDetailsForm.patchValue({
          name: this.orgDetailsArr.name,
          superAdminName: this.orgDetailsArr.superAdminName,
          address: this.orgDetailsArr.address,
          contactEmail: this.orgDetailsArr.contactEmail,
          contactNumber: this.orgDetailsArr.contactNumber,
          subscriptionFees: this.orgDetailsArr.subscriptionFees,
          subscriptionFrequency: this.orgDetailsArr.subscriptionFrequency,
          bannerColor: this.orgDetailsArr.bannerColor,
          headerColor: this.orgDetailsArr.headerColor,
          logo: this.orgDetailsArr.logo
        })
        this.headerColor = this.orgDetailsArr.headerColor
        this.bannerColor = this.orgDetailsArr.bannerColor;
        this.recent_image = this.orgDetailsArr.logo
      },
      (err) => {
        this.spinner.hide()
        this.helperService.showError(err.message)
      }
    )
  }

  public checkImage(event) {
    this.files = [].slice.call(event.target.files);
    var file = event.target.files[0];
    this.photoName = file.name;
    var allowedExtensions = ["jpg", "jpeg", "png", "JPG", "JPEG", "gif"];
    this.fileExtension = this.photoName.split(".").pop();
    if (allowedExtensions.indexOf(this.fileExtension) != -1) {
      // this.fileExtensionError = false;
      // this.fileExtensionMessage = "";
      // this.profileImage = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.recent_image = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    }
  }

  onSubmit() {
    var payload = new FormData();
    payload.append("name", this.orgDetailsForm.value.name);
    payload.append("superAdminName", this.orgDetailsForm.value.superAdminName);
    payload.append("address", this.orgDetailsForm.value.address);
    payload.append("contactEmail", this.orgDetailsForm.value.contactEmail);
    payload.append("contactNumber", this.orgDetailsForm.value.contactNumber);
    payload.append("subscriptionFees", this.orgDetailsForm.value.subscriptionFees);
    payload.append("subscriptionFrequency", this.orgDetailsForm.value.subscriptionFrequency);
    payload.append("bannerColor", this.orgDetailsForm.value.bannerColor);
    payload.append("headerColor", this.orgDetailsForm.value.headerColor);

    if (this.files == null) {
      console.log(this.files)
      payload.append("logo", this.orgDetailsForm.value.logo);
    } else {
      for (var i = 0; i < this.files.length; i++) {
        this.orgDetailsForm.value.logo = this.files;
        for (var i = 0; i < this.files.length; i++) {
          payload.append("logo[]", this.files[i]);
        }
      }
    }
    this.spinner.show();
    console.log(payload)
    this.commonService.patchHttpCallImage({ url: '/organisations/' + this.orgDetailsArr._id, data: payload }).subscribe((res) => {
      this.spinner.hide();
      if (res.status == 200) {
        this.files = [];
        this.helperService.showSuccess(res.message)
      }
    }, (err) => {
      this.spinner.hide();
      this.files = [];
      this.helperService.showError(err.error?.message)
    })
  }

  goBack() {
    this._location.back();
  }
}
