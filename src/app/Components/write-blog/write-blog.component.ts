import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/utils/services/login.service';
import * as moment from 'moment';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css']
})
export class WriteBlogComponent implements OnInit {


  blogsdataObj:any={
    title:'',
    content:'',
   
  }
  
  userId:any;
  isEditMode!: boolean;
  blogId: any;
  blogArr:any= [];



  constructor(private loginService: LoginService,private toaster: ToastrService,private router: Router,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.isEditMode = this.router.url.split('/')[1] === 'edit-blog';
    this.isEditMode && this.activatedRoute.params.subscribe(params => {this.blogId = params['id']});

    if(this.isEditMode === true){
      this.getAllBlogById();
    }
    
  }

  Cancelblog(){
    this.router.navigate([`./bloglist/`])
  }

  public getAllBlogById() {
    
    this.loginService.getAllBlog({id: this.blogId})
      .subscribe((res: any) => {
        if (res.status.code === 200) {
          this.blogsdataObj = res.data[0];
          console.log(this.blogsdataObj)
        } else {
          this.blogsdataObj = [];
        }
      }),
        () => {
          this.blogsdataObj = [];
        };
    }

// edit blog method
    saveEditData() {
      const date= moment().format('YYYY-MM-DD')
      const data = {
        "title": this.blogsdataObj.title,
        "content": this.blogsdataObj.content,
        "user_id": this.userId,
        'date' :date,
        'id':this.blogId
      }
      this.loginService.putBlogData(data)
      .subscribe((res: any) => {
        if(res.status.code === 200) {
          this.blogsdataObj.title ='';
          this.blogsdataObj.content = '';
          this.toaster.success("Successfully Updated");
          this.router.navigate([`./bloglist/`])
        } else {
        }
      })
  
    }

  
  //Registration form method
  onSubmitregistration(){
    let dta= {
      "title": this.blogsdataObj.title,
      "content": this.blogsdataObj.content,
      "user_id": this.userId,
      'date' :Date(),
     
    }
    this.loginService.addBlog(dta)
    .subscribe((res:any) => {
      if (res.status.code === 200) {
        this.toaster.success("Blog Successfully Posted !");
        this.blogsdataObj.title ='';
        this.blogsdataObj.content = '';
        this.router.navigate([`./bloglist/`])
      }else{
        this.toaster.error(res.status.error[0]);
      }
    }, (err) => {
      // console.log(res.status.error[0])
    })
  }

}
