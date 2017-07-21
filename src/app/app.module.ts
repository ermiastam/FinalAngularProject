import 'hammerjs';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ApplicationRef} from '@angular/core';
import {AppComponent} from './app.component';
import {PostjobComponent} from './components/postjob/postjob.component';
import {PostsComponent} from './components/posts/posts.component';
import {joblistComponent} from './components/joblist/joblistComponent';
import {ProfileComponent} from './components/profile/profile.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {DataService} from './services/data.service';
import {AuthService} from './services/auth.service';
import {MyRoutesModule} from './app.routes';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from '@agm/core';
import {ActivatedRoute} from '@angular/router';
import {JobpostComponent} from './components/jobpost/jobpost.component';
import {ValiduserGuard} from "./guards/validuser.guard";
import {ApplicantsComponent} from './components/posts/applicants.component';
import {ApplicantsdetailComponent} from './components/posts/applicantsdetail.component';
import {HiredapplicantComponent} from './components/posts/hiredapplicant.component';
import {postDetailsComponent} from './components/joblist/postDetailsComponent';
import {EmployerDetailsComponent} from './components/profile/employer-details.component';
import {MinFeeComponent} from './components/joblist/min-fee.component';
import {SwiftPipe} from './pipes/swift.pipe';
import {CategoryComponent} from './components/joblist/category.component';
import {AuthHttp} from "angular2-jwt";
import {authHttpServiceFactory} from "./authHttpServiceFactory";


@NgModule({
  declarations: [
    AppComponent,
    PostjobComponent,
    PostsComponent,
    joblistComponent,
    ProfileComponent,
    HomepageComponent,
    JobpostComponent,
    ApplicantsComponent,
    ApplicantsdetailComponent,
    HiredapplicantComponent,
    postDetailsComponent,
    EmployerDetailsComponent,
    MinFeeComponent,
    SwiftPipe,
    CategoryComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MyRoutesModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqsKlBRsxG-Spl8QC625fv4AxY29ZkxK0',
      libraries: ["places"]
    })

  ],
  providers: [DataService, AuthService, ValiduserGuard, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  entryComponents: [PostjobComponent, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
