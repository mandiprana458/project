import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './org-superAdmin-pages/user-list/user-list.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/shared/material.module';
import { UserDetailsComponent } from './org-superAdmin-pages/user-details/user-details.component';
import { AddUserComponent } from './org-superAdmin-pages/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'src/pipes/pipes.module';
import { OrgListComponent } from './app-superAdmin-pages/org-list/org-list.component';
import { AddOrgComponent } from './app-superAdmin-pages/add-org/add-org.component';
import { OrgDetailsComponent } from './app-superAdmin-pages/org-details/org-details.component';
import { EditDialogComponent } from './app-superAdmin-pages/org-details/edit-dialog/edit-dialog.component';
import { ReportListComponent } from './org-superAdmin-pages/report-list/report-list.component';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PreviewReportComponent } from './org-admin-pages/preview-report/preview-report.component';
import { EditUserAccessComponent } from './org-superAdmin-pages/edit-user-access/edit-user-access.component';
import { SexualAssaultComponent } from './org-user-pages/higher_education/crime-defination/sexual-assault/sexual-assault.component';
import { EditCrimeReportComponent } from './org-user-pages/higher_education/edit-crime-report/edit-crime-report.component';
import { ReviewSubmissionReportComponent } from './org-user-pages/higher_education/review-submission-report/review-submission-report.component';
import { SubmitNewReportComponent } from './org-user-pages/higher_education/submit-new-report/submit-new-report.component';
import { SubmitNewReportK12Component } from './org-user-pages/K12/submit-new-report-k12/submit-new-report-k12.component';
import { ReviewSubmissionReportK12Component } from './org-user-pages/K12/review-submission-report-k12/review-submission-report-k12.component';
import { EditCrimeReportComponentOrgSuperAdmin } from './org-superAdmin-pages/edit-crime-report/higher-education/edit-crime-report.component';
import { EditK12CrimeReportComponent } from './org-superAdmin-pages/edit-crime-report/k12/edit-k12-crime-report/edit-k12-crime-report.component';
import { ReviewOrgSuperAdminReportK12Component } from './org-superAdmin-pages/review-submission-org-super-admin/k12/review-org-super-admin-report-k12/review-org-super-admin-report-k12.component';
import { ReviewSubmissionOrgSuperAdminComponent } from './org-superAdmin-pages/review-submission-org-super-admin/higher-secondary/review-submission-org-super-admin.component';
import { MakePaymentComponent } from './org-superAdmin-pages/payment/make-payment/make-payment.component';
import { InvoicesComponent } from './org-superAdmin-pages/payment/invoices/invoices.component';
import { EditReportK12Component } from './org-user-pages/K12/edit-report-k12/edit-report-k12.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true,
  suppressScrollX: true
};

@NgModule({
  declarations: [
    DashboardComponent,
    UserListComponent,
    UserDetailsComponent,
    AddUserComponent,
    OrgListComponent,
    AddOrgComponent,
    OrgDetailsComponent,
    EditDialogComponent,
    SubmitNewReportComponent,
    SexualAssaultComponent,
    ReviewSubmissionReportComponent,
    EditCrimeReportComponent,
    EditCrimeReportComponentOrgSuperAdmin,
    ReportListComponent,
    PreviewReportComponent,
    ReviewSubmissionOrgSuperAdminComponent,
    EditUserAccessComponent,
    SubmitNewReportK12Component,
    ReviewSubmissionReportK12Component,
    EditK12CrimeReportComponent,
    ReviewOrgSuperAdminReportK12Component,
    MakePaymentComponent,
    InvoicesComponent,
    EditReportK12Component
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    UsersRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class UsersModule { }
