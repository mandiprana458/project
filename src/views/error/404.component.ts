import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor(public _location: Location, public router: Router) { }

  goBack(){
    this.router.navigate(['/users/dashboard'])
  }

}
