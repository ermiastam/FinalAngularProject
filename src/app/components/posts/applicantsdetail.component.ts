import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
//import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-applicantsdetail',
  templateUrl: './applicantsdetail.component.html',
  styleUrls: ['./applicantsdetail.component.css']
})
export class ApplicantsdetailComponent implements OnInit {

  applicantId;
  applicantdetail;
  postId;
  evaluation = [];
  //private subscription: Subscription;

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.getApplicantsDetail();
  }

  getApplicantsDetail(){
    this.route.parent.queryParams.subscribe(params => {this.applicantId = params["id"];
    this.postId = params["postId"];
  });

    this.data.getApplicantDetail(this.applicantId).subscribe(res => {
      this.applicantdetail = res[0];

      // for (let eval1 of this.applicantdetail.evaluation){
      //     if (eval1.role === 'employer'){
      //       console.log("Role: " + eval1.role);
      //       this.evaluation.push(eval1);
      //     }
      // }

      this.evaluation = this.applicantdetail.evaluation;
    });

  }

  hideMe() {
    this.router.navigate(['homepage/myposts/searchposts/postapplicants'], {queryParams: {id: this.postId}});
  }

  pushComment(comment, stars){
    console.log("Comment" + comment);
    console.log("stars" + stars);
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}
