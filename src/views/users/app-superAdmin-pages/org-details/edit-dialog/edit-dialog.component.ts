import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  name: any;
  title: any;

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data, private service: CommonServiceService, public helperService: HelperService, public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.data.type == 1) {
      this.title = "Change Organization Name"
    }
    else if (this.data.type == 2) {
      this.title = "Change Super Admin Name"
    }
    else if (this.data.type == 3) {
      this.title = "Change Address"
    }
    else if (this.data.type == 4) {
      this.title = "Change Contact"
    }
    else if (this.data.type == 5) {
      this.title = "Change Subscription Fees ($)"
    }
    else if (this.data.type == 6) {
      this.title = "Change Subscription Frequency"
    }
    else if (this.data.type == 7) {
      this.title = "Change Banner Color"
    }
    else if (this.data.type == 8) {
      this.title = "Change Header Color"
    }
    else if (this.data.type == 9) {
      this.title = "Change Email"
    }
    if (this.data.type == 5) {
      this.name = this.data.value.toFixed(2)
    } else {
      this.name = this.data.value
    }
  }

  saveEditedData() {
    const editedData = {
      editedValue: this.name,
      firedType: this.data.type
    }
    this.closeDialog(editedData)
  }

  //Section: Dialog dismiss method
  closeDialog(result: any) {
    this.dialogRef.close(result);
  }
}
