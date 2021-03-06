import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ChartsModule } from 'ng2-charts';

import { HttpClientModule } from '@angular/common/http';
import { ExportAsModule } from 'ngx-export-as';
import { MyBarChartComponent } from './pages/my-bar-chart/my-bar-chart.component';
import { PagenofouundComponent } from './pages/pagenofouund/pagenofouund.component';


const googleLoginOptions: any = {
  scope: 'openid profile email https://www.googleapis.com/auth/analytics.readonly'
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyBarChartComponent,
    PagenofouundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    ExportAsModule,
    ChartsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '681971571095-ubva1fj2lqdfdop81cajl7c8fam24h27.apps.googleusercontent.com',
              googleLoginOptions
            ),
          }
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
