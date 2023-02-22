import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';


@Pipe({name: 'slugCreate', pure: false })
export class WordReplace implements PipeTransform {

   public str:any;
  constructor(private sanitizer: DomSanitizer) {

     this.str= '';
  }

  transform(value: string): string {
    this.str = value;
    if(this.str)
    {
        this.str = this.str.replace(/\//g, "");
        this.str = this.str.replace(/\s+/g, '-').toLowerCase();
 
        return this.str;
    }
    else{
      return '';
    }
   }
}

@Pipe({name: 'strLimit', pure: false })
export class strLimit implements PipeTransform {


  transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args[1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;
   }
}

@Pipe({name: 'customIdEncode', pure: false})
export class customIdEncode implements PipeTransform{
  public str:any;
  constructor(private sanitizer: DomSanitizer){
    this.str = '';
  }
  transform(value: string): string{
    return btoa(value);
  }
}

@Pipe({name: 'customPhoneFormat', pure: false })
export class customPhoneFormat implements PipeTransform {

  public str:any;
  constructor(private sanitizer: DomSanitizer) {

  }

  transform(value): string {
    // 
    // value = value.toString();
    if(!value){
      value = '(xxx) xxx-xxxxxxxx';
      return "--";
    }
    else{
      value = value.replace(/\s/g, "T");
      var s2 = (""+value).replace(/\D/g, '');

      //value = s2.match(/^(\d{3})(\d{3})(\d{4})(\d*)$/);

      value = s2.match(/^(\d{3})(\d{3})(\d*)$/);

      //console.log(value);

      /*if (value[4]!="") {
        return (!value) ? "--" : "(" + value[1] + ") " + value[2] + "-" + value[3]+ "-" + value[4];
      }else{*/
        return (!value) ? "--" : "(" + value[1] + ") " + value[2] + "-" + value[3];
      /*}*/
      
    }
    
    
    // var datePipe = new DatePipe("en-US");
    // var convertdate = datePipe.transform(value, 'h:mm a MMMM dd yyyy');
         
   }
}


@Pipe({ name: 'ObjNgFor',  pure: false })
export class ObjNgFor implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)//.map(key => value[key]);
    }
}

@Pipe({name: 'customCounter', pure: false })
export class customCounter implements PipeTransform {

  public str:any;
  constructor(private sanitizer: DomSanitizer) {

  }

   transform(value: any): number {
    if(value == undefined){
      value = 0;
    }
    //value = value + 1;

    /*var time = setInterval(() => {
      value += value;
      console.log(value)
    }, 1000);*/
   
    return value;
   }
}


@Pipe({ name: 'sanitizeHtml'})

export class sanitizeHtmlPipe implements PipeTransform  {

  constructor(private _sanitizer:DomSanitizer) { }

  transform(value:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}

@Pipe({ name: 'dateAgo', pure: false })
export class dateAgo implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            const intervals = {
                'year': 31536000,
                'month': 2592000,
                'week': 604800,
                'day': 86400,
                'hour': 3600,
                'minute': 60,
                'second': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    } else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    }
}



