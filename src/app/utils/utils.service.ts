import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from '../utils/constants/index';
import { Router, UrlSerializer } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UtilsService {
  constructor(
    private toaster: ToastrService,
    private router: Router,
    private serializer: UrlSerializer) {}


  errorAPIMsgAlertHandler(resObj: { code: { toString: () => any; }; description: any; }, showAlert = false) {
    const statusCode = resObj.code.toString();
    const statusDescription = resObj.description;
    this.toaster.toastrConfig.timeOut = 5000;
    this.toaster.toastrConfig.disableTimeOut = false;
    if (statusCode.indexOf('2') === 0 && showAlert) {
      this.toaster.success(statusDescription);
    } else if (statusCode.indexOf('4') === 0) {
      if (statusCode === '401') {
        this.toaster.toastrConfig.disableTimeOut = true;
        this.toaster.error('User UnAuthorised, Kindly Login ');
        this.logoutUser();
      } else {
        this.toaster.warning(statusDescription);
      }
    } else if (statusCode.indexOf('6') === 0) {
      // this.toaster.toastrConfig.timeOut = 0;
      this.toaster.toastrConfig.disableTimeOut = true;
      this.toaster.error(statusDescription);
    } else {
      // this.toaster.toastrConfig.timeOut = 0;
      this.toaster.toastrConfig.disableTimeOut = true;
      this.toaster.error(statusDescription);
    }
  }
 
  logoutUser() {
    window.localStorage.clear();
    setTimeout(() => {
    this.toaster.clear();
    },4000)
    this.router.navigate(['../login'])
  }

  
  /***
  * name: errorServiceHandler
  * desc: handling service error status codes
  ***/
  errorServiceHandler(error: HttpErrorResponse) {
    this.toaster.toastrConfig.timeOut = 5000;
    this.toaster.toastrConfig.disableTimeOut = false;
    // set error msg when service fails
    let errMsg = '';
    errMsg = error.status + ' ' + error.statusText + ' ' + error.error;
    if (error.status === 0) {
      // if service could not be connected
      errMsg = CONSTANTS.MAIN.APP.MESSAGES.SERVICE_ERR;
    } else if (error.status === 401) {
      // if unauthorized request
      setTimeout(() => {
        this.logoutUser();
      }, 2000)
    } else if (error.status === 404) {
      errMsg = '404 ' + CONSTANTS.MAIN.APP.MESSAGES.NOT_FOUND_ERR;
    }
    else if (error.status === 500) {
      errMsg = CONSTANTS.MAIN.APP.MESSAGES.ERR_CODE_500;
    } else {
      // other error codes
      errMsg = error.statusText + ' ' + error.status;
      if (error.status === 400 && error.error) {
        errMsg = error.error.message;
      }
    }
    this.toaster.toastrConfig.disableTimeOut = true;
    this.toaster.error(errMsg);
  }
 

 

 


  searializeUrl(routePath: any, params: any) {
    const Urltree = this.router.createUrlTree([routePath], { queryParams: params });
    return this.serializer.serialize(Urltree);
  }
}

