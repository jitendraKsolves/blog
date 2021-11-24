
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private httpService: HttpService) { }

  public checkLogin(data: { name: string; password: string; }): Observable<Object> {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.USERS, data)
  }

  public registration(data1: any): Observable<Object> {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.REGISTRATION, data1);
  }

  //BLOG_ADD

  public addBlog(data1: any): Observable<Object> {
    return this.httpService.post(CONSTANTS.MAIN.APP.URLS.BLOG_ADD, data1);
  }

  public getAllBlog(data1: any): Observable<Object> {
    return this.httpService.get(CONSTANTS.MAIN.APP.URLS.BLOGS, data1);
  }
  // BLOGS_DELETE
  public deleteBlog(id:any): Observable<Object> {
    return this.httpService.delete(`${CONSTANTS.MAIN.APP.URLS.BLOGS_DELETE}?id=${id}`);
  }

  //PUT_BLOG

  public putBlogData(data: any): Observable<any> {
    return this.httpService.put(CONSTANTS.MAIN.APP.URLS.PUT_BLOG,data)
  }

//get comments 

public getBlogcomment(data1: any): Observable<Object> {
  return this.httpService.get(CONSTANTS.MAIN.APP.URLS.GET_COMMENTS, data1);
}
public postBlogcomment(data1: any): Observable<Object> {
  return this.httpService.post(CONSTANTS.MAIN.APP.URLS.POST_COMMENTS, data1);
}

public putCommentData(data: any): Observable<any> {
  return this.httpService.put(CONSTANTS.MAIN.APP.URLS.PUT_COMMENTS,data)
}
//COMMENTS_DELETE

public deletecomment(id:any): Observable<Object> {
  return this.httpService.delete(`${CONSTANTS.MAIN.APP.URLS.COMMENTS_DELETE}?id=${id}`);
}

loggedIn(){
  return !!localStorage.getItem('token')
}


}
