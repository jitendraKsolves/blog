import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoginService } from 'src/app/utils/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;

  user = {
    name: '',
    password: ''
  }


  registerForm!: FormGroup;
  submitted = false;


  logdivshow:boolean=false;
  constructor(private loginService: LoginService, private router: Router, private toaster: ToastrService,private formBuilder: FormBuilder) { }
  unsubsribeNotifier = new Subject();

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
     
  });

  }

  get f() { return this.registerForm.controls; }

//log in method
  onSubmit() {
    // console.log(this.user)
    this.loading = true;
    this.loginService.checkLogin(this.user)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res:any) => {
      if (res.status.code === 200) {
        localStorage.setItem('token', (res.token || null));
        localStorage.setItem('userId', (res.data[0].id || null));
        localStorage.setItem('userName', (res.data[0].name || null));
        this.router.navigate(['/bloglist'])
        this.loading = false;
        this.toaster.success("You are Loged In ");
      }else{
        this.toaster.warning(res.reason);
        
      }
      this.loading = false;
    }, (err) => {
      // console.log(err)
    })
  }
  switchRegistration(){
    this.logdivshow =!this.logdivshow;
    this.user.name = '';
    this.user.password='';
  }

  //Registration form method
  onSubmitregistration(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loginService.registration(this.registerForm.value)
    .pipe(takeUntil(this.unsubsribeNotifier))
    .subscribe((res:any) => {
      if (res.status.code === 200) {
        this.toaster.success("New User Created !");
        this.logdivshow =!this.logdivshow;
        this.user.name = '';
        this.user.password='';
      }else{
        this.toaster.error(res.reason);
      }
    }, (err) => {
      // console.log(err)
    })
  }

}
