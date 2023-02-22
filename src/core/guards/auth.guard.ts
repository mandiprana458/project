import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
      // return true;
    }

  }

}

@Injectable({
  providedIn: 'root'
})
export class AuthAppAdminRouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('user_type') == '1') {
      return true;
    } else {
      this.router.navigate(['/users/dashboard']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthOrgAdminRouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('user_type') == '2') {
      return true;
    } else {
      this.router.navigate(['/users/dashboard']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserRouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('user_type') == '3') {
      return true;
    } else {
      this.router.navigate(['/users/dashboard']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthUserAdminsRouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (["1", "2", "3", "4"].includes(localStorage.getItem('user_type'))) {
      return true;
    } else {
      this.router.navigate(['/users/dashboard']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthAdminRouteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('user_type') == '4') {
      return true;
    } else {
      this.router.navigate(['/users/dashboard']);
      return false;
    }
  }
}
