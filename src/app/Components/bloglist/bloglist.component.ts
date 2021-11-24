import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/utils/services/login.service';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit {

  constructor(private loginService: LoginService,private toaster: ToastrService, private router: Router,
    private modalService: BsModalService) { }
  currentPage=1;
  blogArr:any= [];
  filterObj!: {};
  totalCount:any;
  changeText:any;
  globalQuery = '';
  userId:any;
  bloguserId: any;

  ngOnInit(): void {
    this.getAllBlog();
    this.userId = localStorage.getItem('userId');
  }

  public getAllBlog() {
    
  this.loginService.getAllBlog({...this.filterObj})
    .subscribe((res: any) => {
      if (res.status.code === 200) {
        this.blogArr = res.data;
        console.log(this.blogArr)
        this.totalCount = res.count
      } else {
        this.blogArr = [];
      }
    }),
      () => {
        this.blogArr = [];
      };
  }

  pageChanged(e: { page: number; }) {
    if(this.currentPage === e.page) {
      return;
    }
    this.currentPage = e.page;
    // this.persistPage(e.page);

    this.getAllBlog();
  }
//search method

SearchFilter() {
  this.filterObj = {
    ...this.filterObj,
    ...{ search: this.globalQuery || "" },
  }
  this.currentPage = 1;
 this.getAllBlog();
}
  
@ViewChild('template', { static: false })
commentIdDel:any
message:any;
templateVar!: TemplateRef<any>;
modalRef!: BsModalRef;


openModal(template: TemplateRef<any>, actionFor: number, data = null) {
 
  let editcommentObj = this.blogArr && this.blogArr
  .filter((e: { id: any; }) => e.id === actionFor)[0];
    this.message =  editcommentObj.title;
    
    this.commentIdDel = actionFor;
  this.modalRef = this.modalService.show(template, {class: 'modal-md'});
}

decline() {
  this.modalRef.hide();
}

confirm() {
  this.modalRef.hide();
  this.deleteBlog(this.commentIdDel);
}



//Deleting blog 
  deleteBlog(id: any){
  
  this.loginService.deleteBlog(id)
  .subscribe((res:any) => {
    if (res.status.code === 200) {
      this.toaster.success("Blog Successfully Deleted !");
      this.getAllBlog();
    }else{
      this.toaster.error(res.status.error[0]);
    }
  }, (err) => {
    // console.log(res.status.error[0])
  })
}



editBlog(id: any){
  this.router.navigate([`./edit-blog/${id}`])

}

// redirect to details page.
detailsPage (e: { id: any; }) {
  this.router.navigate([`./blogdetails/${e}`])
}

  

}
