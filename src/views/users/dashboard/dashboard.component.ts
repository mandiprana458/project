import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user_type: any;
  org_Id: any;
  org_type: any;

  constructor() { }

  ngOnInit(): void {
    this.user_type = localStorage.getItem("user_type")
    this.org_Id = localStorage.getItem("organisationId")
    this.org_type = localStorage.getItem("organisationType")
    console.log(this.org_Id)
  }

}
