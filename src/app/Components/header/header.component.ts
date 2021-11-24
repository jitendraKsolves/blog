import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  isCollapsed = true;
  hideUser = true;
  userId :any;
  userName:any;
  userEmail:any;

  @ViewChild('toggleInfo', { static: true })
  toggleInfo!: ElementRef;
  @ViewChild('toggleBtn', { static: true })
  toggleBtn!: ElementRef;

  
  constructor(private utilsService: UtilsService) { 
    
  }

  

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
  }

  logOut() {
    this.utilsService.logoutUser();
    
  }
  
}
