import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { PipeModule } from 'src/pipes/pipes.module';
import { ResetTokenPasswordComponent } from './reset-token-password/reset-token-password.component';



@NgModule({
  declarations: [
    SigninComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DefaultHeaderComponent,
    ResetTokenPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MaterialModule,
    NgxSpinnerModule,
    PipeModule
  ],
  exports: [
    DefaultHeaderComponent
  ]
})
export class HomeModule { }
