import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/core/services/common/common-service.service';
import { HelperService } from 'src/core/services/helper/helper.service';
import readXlsxFile, { Email } from 'read-excel-file'
// const ref = require("../../../../core/services/helper/helper.service")

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  searchedText: any = ''
  searchedType: any = ''
  bulkUserArr = []
  payload: {
    contactEmail: "",
    contactNumber: "",
    name: ""
  }

  constructor(public commonService: CommonServiceService,
    public router: Router, public spinner: NgxSpinnerService,
    public helperService: HelperService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserList()
  }

  applyFilter() {
    if (this.searchedText != "") {
      if (this.searchedType == 'Name') {
        this.payload = {
          contactEmail: "",
          contactNumber: "",
          name: this.searchedText
        }
      }
      else if (this.searchedType == 'Email') {
        this.payload = {
          contactEmail: this.searchedText,
          contactNumber: "",
          name: ""
        }
      }
      else if (this.searchedType == 'Contact') {
        this.payload = {
          contactEmail: "",
          contactNumber: this.searchedText,
          name: ""
        }
      }
      else {
        this.searchedText = ""
        this.payload = {
          contactEmail: "",
          contactNumber: "",
          name: ""
        }
      }
      this.getUserList();
    }
  }

  userListArr: any[] = []

  getUserList() {
    this.spinner.show();
    this.commonService.getAPICall({ url: '/users', data: this.payload }).subscribe(res => {
      this.spinner.hide()
      if (res.status == '200') {
        this.userListArr = res.data
      }
    }, (err) => {
      this.spinner.hide();
      this.helperService.showError(err.error.message)
    })
  }

  addMultipleUser() {
    let testSpinner = this.spinner
    let testService = this.commonService
    let tostr = this.helperService
    let input = <HTMLInputElement>document.getElementById('file')
    input.click();
    input.addEventListener('change', function () {
      const schema = {
        'Sl. No': {
          prop: 'row',
          type: Number,
          required: true
        },
        'FirstName': {
          prop: 'firstName',
          type: String,
          required: true
        },
        'LastName': {
          prop: 'lastName',
          type: String,
          required: true
        },
        'Email': {
          prop: 'email',
          type: Email,
          required: true
        },
        'ContactNumber': {
          prop: 'contactNumber',
          type: Number,
          required: true
        },
        'Grade': {
          prop: 'grade',
          type: Number,
          required: true
        },
        'RoleName': {
          prop: 'roleName',
          type: String,
          required: true
        },
        'DOB': {
          prop: 'dob',
          type: Date,
          required: true
        }
      }
      readXlsxFile(input.files[0], { schema }).then(({ rows, errors }) => {
        console.log(rows)
        testSpinner.show()
        testService.postAPICall({ url: '/bulk/users', data: { "users": rows } }).subscribe(res => {
          testSpinner.hide()
          if (res.status == '200') {
            tostr.showSuccess(res.data.message)
          }
        }, (err) => {
          testSpinner.hide()
          tostr.showError(err.message)
        })
        // var i = 0;
        // var headers = [];
        // var json_object = [];
        // var expectedHeader = ['Sl. No', 'FirstName', 'LastName', 'Email', 'ContactNumber', 'Grade', 'RoleName', 'DOB']

        // data.map((row, index) => {
        //   console.log(row)
        //   if (i == 0) {
        //     headers = row
        //   }

        //   if (i > 0) {
        //     var temp = {}
        //     for (var x = 0; x < (row.length); x++) {
        //       temp[headers[x]] = row[x]

        //     }
        //     json_object.push(temp)
        //   }
        //   i++
        // });

        // if (isEqual(expectedHeader, headers)) {
        //   console.log(headers)
        //   console.log(json_object)
        //   testSpinner.show()
        //   // testService.postAPICall({url: '/bulk/users', data: {"users" : json_object}}).subscribe(res=>{
        //   //   testSpinner.hide()
        //   //   if(res.status == '200'){
        //   //     this.helperService.showSuccess(res.data.message)
        //   //   }
        //   // },(err)=>{
        //   //   testSpinner.hide()
        //   //   this.helperService.showError(err.error.message)
        //   // })
        // } else {
        //   tostr.showError('Please add headers like Sl. No, FirstName, LastName, Email, ContactNumber, Grade, RoleName, DOB')
        // }
      })
    })
  }

}
function isEqual(a, b) {
  return a.join() == b.join();
}

