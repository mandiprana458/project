import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminRouteGuardService, AuthUserAdminsRouteGuardService, AuthAppAdminRouteGuardService, AuthGuardService, AuthOrgAdminRouteGuardService, AuthUserRouteGuardService } from 'src/core/guards/auth.guard';
import { P404Component } from '../error/404.component';
import { AddOrgComponent } from './app-superAdmin-pages/add-org/add-org.component';
import { OrgDetailsComponent } from './app-superAdmin-pages/org-details/org-details.component';
import { OrgListComponent } from './app-superAdmin-pages/org-list/org-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreviewReportComponent } from './org-admin-pages/preview-report/preview-report.component';
import { AddUserComponent } from './org-superAdmin-pages/add-user/add-user.component';
import { EditCrimeReportComponentOrgSuperAdmin } from './org-superAdmin-pages/edit-crime-report/higher-education/edit-crime-report.component';
import { EditK12CrimeReportComponent } from './org-superAdmin-pages/edit-crime-report/k12/edit-k12-crime-report/edit-k12-crime-report.component';
import { EditUserAccessComponent } from './org-superAdmin-pages/edit-user-access/edit-user-access.component';
import { MakePaymentComponent } from './org-superAdmin-pages/payment/make-payment/make-payment.component';
import { ReportListComponent } from './org-superAdmin-pages/report-list/report-list.component';
import { ReviewSubmissionOrgSuperAdminComponent } from './org-superAdmin-pages/review-submission-org-super-admin/higher-secondary/review-submission-org-super-admin.component';
import { ReviewOrgSuperAdminReportK12Component } from './org-superAdmin-pages/review-submission-org-super-admin/k12/review-org-super-admin-report-k12/review-org-super-admin-report-k12.component';
import { UserDetailsComponent } from './org-superAdmin-pages/user-details/user-details.component';
import { UserListComponent } from './org-superAdmin-pages/user-list/user-list.component';
import { EditCrimeReportComponent } from './org-user-pages/higher_education/edit-crime-report/edit-crime-report.component';
import { ReviewSubmissionReportComponent } from './org-user-pages/higher_education/review-submission-report/review-submission-report.component';
import { SubmitNewReportComponent } from './org-user-pages/higher_education/submit-new-report/submit-new-report.component';
import { EditReportK12Component } from './org-user-pages/K12/edit-report-k12/edit-report-k12.component';
import { ReviewSubmissionReportK12Component } from './org-user-pages/K12/review-submission-report-k12/review-submission-report-k12.component';
import { SubmitNewReportK12Component } from './org-user-pages/K12/submit-new-report-k12/submit-new-report-k12.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  //for org super admin
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuardService, AuthUserAdminsRouteGuardService]
  },
  {
    path: 'edit-user-access/:user_id',
    component: EditUserAccessComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'report-list',
    component: ReportListComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'edit-report-listHEd/:id',
    component: EditCrimeReportComponentOrgSuperAdmin,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'edit-report-listk12/:id',
    component: EditK12CrimeReportComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'review-orgSuperAdmin-submission-report-k12/:id',
    component: ReviewOrgSuperAdminReportK12Component,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'review-orgSuperAdmin-submission-report/:id',
    component: ReviewSubmissionOrgSuperAdminComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'make-payment',
    component: MakePaymentComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  {
    path: 'org-details/:id',
    component: OrgDetailsComponent,
    canActivate: [AuthGuardService, AuthOrgAdminRouteGuardService]
  },
  //for app super admin
  {
    path: 'org-list',
    component: OrgListComponent,
    canActivate: [AuthGuardService, AuthAppAdminRouteGuardService]
  },
  {
    path: 'org-add',
    component: AddOrgComponent,
    canActivate: [AuthGuardService, AuthAppAdminRouteGuardService]
  },
  {
    path: 'app-org-details/:id',
    component: OrgDetailsComponent,
    canActivate: [AuthGuardService, AuthAppAdminRouteGuardService]
  },
  //for org users
  // HigherEducation
  {
    path: 'submit-new-report',
    component: SubmitNewReportComponent,
    canActivate: [AuthGuardService, AuthUserRouteGuardService]
  },
  {
    path: 'review-submission-report',
    component: ReviewSubmissionReportComponent,
    canActivate: [AuthGuardService, AuthUserRouteGuardService]
  },
  {
    path: 'edit-submission-report',
    component: EditCrimeReportComponent,
    canActivate: [AuthGuardService, AuthUserRouteGuardService]
  },
  //K12
  {
    path: 'submit-new-report-k12',
    component: SubmitNewReportK12Component,
    canActivate: [AuthGuardService, AuthUserAdminsRouteGuardService]
  },
  {
    path: 'review-submission-report-k12',
    component: ReviewSubmissionReportK12Component,
    canActivate: [AuthGuardService, AuthUserRouteGuardService]
  },
  {
    path: 'edit-submission-report-k12',
    component: EditReportK12Component,
    canActivate: [AuthGuardService, AuthUserRouteGuardService]
  },
  // {
  //   path: 'edit-submission-report-k12',
  //   component: EditCrimeReportComponent,
  //   canActivate: [AuthGuardService, AuthUserRouteGuardService]
  // },
  //for admin
  {
    path: 'preview-report-list',
    component: ReportListComponent,
    canActivate: [AuthGuardService, AuthAdminRouteGuardService]
  },
  {
    path: 'preview-report-details/:id',
    component: PreviewReportComponent,
    canActivate: [AuthGuardService, AuthAdminRouteGuardService]
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
