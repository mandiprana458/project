import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, dateFormat: string = 'MM-DD-YYYY'): any {
    if (!value) { return []; }
    //const utcDateTime=new Date(value.replace(' ','T'));
    //const localDateTime = new Date(value+'Z');
    return moment(new Date(value+'Z')).format(dateFormat);
  }

  compare(start: any, end: any, dateFormat: string = 'MM-DD-YYYY') {
    return moment.duration(moment(end, dateFormat).diff(moment(start, dateFormat))).asDays();
  }

  compareTime(start: any, end: any) {
    return moment.duration(moment(end).diff(moment(start), 'seconds')).asSeconds();
  }

  EncodeId(value: string): string{
    return btoa(value);
  }
}

