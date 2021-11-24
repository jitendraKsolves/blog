import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { CoreServiceModule } from './modules/coreService.module';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component'
import { SharedCommonModule } from './modules/sharedCommonModule.module';
import { BloglistComponent } from './Components/bloglist/bloglist.component';
import { WriteBlogComponent } from './Components/write-blog/write-blog.component';
import { BlogDetailsComponent } from './Components/blog-details/blog-details.component';
import { AuthGuard } from './utils/auth/auth.guard';
import { LoginService } from './utils/services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    BloglistComponent,
    WriteBlogComponent,
    BlogDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedCommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreServiceModule,
    
  ],
  providers: [AuthGuard,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
