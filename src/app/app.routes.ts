import {Routes, RouterModule} from '@angular/router'

//Components
import {AppComponent} from './app.component';
import {HomepageComponent} from "./components/homepage/homepage.component";
import {PostjobComponent} from "./components/postjob/postjob.component";
import {JobpostComponent} from "./components/jobpost/jobpost.component";
import {ValiduserGuard} from "./guards/validuser.guard";
import {PostsComponent} from './components/posts/posts.component';
import {ApplicantsComponent} from './components/posts/applicants.component';
import {ApplicantsdetailComponent} from './components/posts/applicantsdetail.component';
import {HiredapplicantComponent} from './components/posts/hiredapplicant.component';
import {EmployerDetailsComponent} from './components/profile/employer-details.component';
import {MinFeeComponent} from './components/joblist/min-fee.component';
import {SwiftPipe} from './pipes/swift.pipe';
import {CategoryComponent} from './components/joblist/category.component';
import {joblistComponent} from './components/joblist/joblistComponent';
import {postDetailsComponent} from './components/joblist/postDetailsComponent';
import {NgModule, ApplicationRef} from '@angular/core';
import {ProfileComponent} from "./components/profile/profile.component";

const MY_ROUTES: Routes = [
  {path: "homepage", component: HomepageComponent},
  /*{path:"homepage/post",component:PostjobComponent}*/
  {path: "homepage/jobpost", component: JobpostComponent, canActivate: [ValiduserGuard]},
  {path: "homepage/myposts/searchposts", component: PostsComponent, canActivate: [ValiduserGuard]},
  {
    path: "homepage/myposts/searchposts/postapplicants", component: ApplicantsComponent, canActivate: [ValiduserGuard],
    children: [{path: "detail", component: ApplicantsdetailComponent, canActivate: [ValiduserGuard]},
      {path: "hire", component: HiredapplicantComponent, canActivate: [ValiduserGuard]}]
  },
  {path: 'homepage/posts', component: joblistComponent, canActivate: [ValiduserGuard]},
  {path: 'minFeePosts', component: MinFeeComponent, canActivate: [ValiduserGuard]},
  {path: 'CatPosts/:cat', component: CategoryComponent, canActivate: [ValiduserGuard]},
  {path: 'CatPosts/:cat/postdetail/:id', component: postDetailsComponent, canActivate: [ValiduserGuard]},
  {path: 'minFeePosts/postdetail/:id', component: postDetailsComponent, canActivate: [ValiduserGuard]},
  //  {path:'posts/:input',component:joblistComponent},
  {path: 'homepage/posts/postdetail/:id', component: postDetailsComponent, canActivate: [ValiduserGuard]},
  {
    path: 'homepage/posts/postdetail/:id', component: postDetailsComponent, canActivate: [ValiduserGuard],
    children: [{path: 'employer/:email', component: EmployerDetailsComponent, canActivate: [ValiduserGuard]}]
  },
  {
    path: 'minFeePosts/postdetail/:id', component: postDetailsComponent, canActivate: [ValiduserGuard],
    children: [{path: 'employer/:email', component: EmployerDetailsComponent, canActivate: [ValiduserGuard]}]
  },
  {
    path: 'CatPosts/:cat/postdetail/:id', component: postDetailsComponent, canActivate: [ValiduserGuard],
    children: [{path: 'employer/:email', component: EmployerDetailsComponent, canActivate: [ValiduserGuard]}]
  },
  {path: "homepage/profile", component: ProfileComponent, canActivate: [ValiduserGuard]},
  {path: "homepage/mypost", component: PostsComponent, canActivate: [ValiduserGuard]},


]

export const MyRoutesModule = RouterModule.forRoot(MY_ROUTES);
