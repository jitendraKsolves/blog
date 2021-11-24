import { NgModule } from '@angular/core';
import { TokenInterceptor } from '../utils/auth/tokenInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class CoreServiceModule { }
