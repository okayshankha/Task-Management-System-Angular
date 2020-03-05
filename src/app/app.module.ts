import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRedirect } from './modules/auth/login-redirect.service';
import { AuthGaurd } from './modules/auth/auth-gaurd.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LoginRedirect,
    AuthGaurd,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
