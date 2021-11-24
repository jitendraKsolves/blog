import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/utils/services/login.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  constructor(private loginService: LoginService,private toaster: ToastrService,private router: Router,private modalService: BsModalService,) { }

  blogId:any;
  userId:any;
  ngOnInit(): void {
    const path = window.location.pathname.split('/');
    this.blogId = path[path.length - 1];
    this.userId = localStorage.getItem('userId');
    this.getAllBlog();
    this.getcomments();
  }
  addcommentObj: any={};
  editcommentObj:any ={};
  blogArr:any= [];
  commentsArr:any= [];
  title :any;
  content :any;
  date:any; name:any;

  //get blog by id
  public getAllBlog() {
  this.loginService.getAllBlog({id: this.blogId})
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.blogArr = res.data;
        this.content= res.data[0].content;
        this.date= res.data[0].date;
        this.name= res.data[0].name;
        this.title= res.data[0].title
      } else {
      }
    }),
      () => {
      };
  }

// getBlogcomment
public getcomments() {
  this.loginService.getBlogcomment({blog_id: this.blogId})
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.commentsArr = res.data;
        console.log(this.commentsArr)
      } else {
      }
    }),
      () => {
      };
  }

  editCommentdiv:boolean=false;
  editComment(id: any){
    this.editCommentdiv =!this.editCommentdiv;
    
    this.editcommentObj = this.commentsArr && this.commentsArr
    .filter((e: { id: any; }) => e.id === id)[0];
    
  }
  EditComment(){
    
    this.editcommentObj['date']= moment(this.editcommentObj.date).format('YYYY-MM-DD');
    this.loginService.putCommentData(this.editcommentObj)
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.editCommentdiv =!this.editCommentdiv;
        this.editcommentObj.comment= '';
        this.getcomments();
        this.toaster.success("Comment Successfully Updated");
      } else {
        // this.toaster.success("Failed ! Please Login");
        // this.router.navigate(['/login'])

      }
    })
  }
  @ViewChild('template', { static: false })
  commentIdDel:any
  message:any;
  templateVar!: TemplateRef<any>;
  modalRef!: BsModalRef;

  openModal(template: TemplateRef<any>, actionFor: number, data = null) {
   
    let editcommentObj = this.commentsArr && this.commentsArr
    .filter((e: { id: any; }) => e.id === actionFor)[0];
      this.message =  editcommentObj.comment;
      
      this.commentIdDel = actionFor;
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  decline() {
    this.modalRef.hide();
  }

  confirm() {
    this.modalRef.hide();
    this.deletecomment(this.commentIdDel);
  }

  //comment delete function
deletecomment(id: any){
  
  this.loginService.deletecomment(id)
  .subscribe((res:any) => {
    if (res.status.code === 200) {
      this.toaster.success("Comment Deleted !");
      this.getcomments();
    }else{
      this.toaster.error(res.status.error[0]);
    }
  }, (err) => {
    // console.log(res.status.error[0])
  })
}



  onSubmit() {

    // if(this.addcommentObj.comment === null || this.addcommentObj.comment === undefined )
    // {
    //   return this.toaster.warning("Comment Box is Empty");
    // }
    const date= new Date();
    const data = {
      
      "comment": this.addcommentObj.comment,
      "blog_id": this.blogId,
      'date' :date,
      'user_id':this.userId
    }
    this.loginService.postBlogcomment(data)
    .subscribe((res: any) => {
      if(res.status.code === 200) {
        this.getcomments();
        this.addcommentObj.comment= '';
        this.toaster.success("Comment Successfully Posted");
      } else {
        this.toaster.success("Failed ! Please Login");
        this.router.navigate(['/login'])

      }
    })
  }

  
}
