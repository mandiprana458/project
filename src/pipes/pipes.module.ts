import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { AppComponent } from '../app/app.component'

import { WordReplace,customPhoneFormat,customIdEncode,ObjNgFor, customCounter, sanitizeHtmlPipe, dateAgo, strLimit } from './allPipes'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WordReplace,customPhoneFormat,customIdEncode,ObjNgFor, customCounter, sanitizeHtmlPipe, dateAgo, strLimit
  ],
  exports: [
    WordReplace,
    customPhoneFormat,
    customIdEncode,
    ObjNgFor,
    customCounter,
    sanitizeHtmlPipe,
    dateAgo,
    strLimit
  ],

  providers: [AppComponent],
})
export class PipeModule {
}
