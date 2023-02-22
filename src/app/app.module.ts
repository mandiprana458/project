import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from 'src/views/home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { UsersModule } from 'src/views/users/users.module';
import { NgxSpinnerModule } from "ngx-spinner"; 
import { DefaultHeaderComponent } from 'src/views/home/default-header/default-header.component';
import { CustomDatePipe } from 'src/pipes/date/custom-date.pipe';
import { PipeModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    UsersModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    PipeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CustomDatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
