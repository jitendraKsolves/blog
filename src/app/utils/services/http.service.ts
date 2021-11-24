import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class HttpService {
  cookieValue = '';

  protected hostUrl = CONSTANTS.HOST_CONFIG.MAIN_URL.HOST_URL;
  protected versionUrl = CONSTANTS.HOST_CONFIG.MAIN_URL.VERSION_URL;
  constructor(private http: HttpClient, protected router: Router) {
  }

   /***
     * function: : get
     * desc:ription : to construct http get request with relative url
     */
  get(relativeUrl: string, paramObj?: any): Observable<any> {
    return this.http.get(this.hostUrl + this.versionUrl + relativeUrl, {params: paramObj});
  }

   /****
     * function : post
     * desc:ription : to construct http post request with relative url and data
     */
  post(relativeUrl: string, data: any) {
      return this.http.post(this.hostUrl + this.versionUrl + relativeUrl, data);
  }


 /****
   * function : put
   * desc:ription : to construct http put request with relative url and data
   */
  put(relativeUrl: string, data: any) {
    return this.http.put(this.hostUrl + this.versionUrl + relativeUrl, data);
  }

 /****
   * function : delete
   * desc:ription : to construct http post request with relative url and data
   ****/
  delete(relativeUrl: string) {
    return this.http.delete(this.hostUrl + this.versionUrl + relativeUrl);
  }


}
