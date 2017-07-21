import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  postId;
  postName;
  applicantemails;
  hiredApplicants = [];
  applicants: any = [];
  
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.getApplicants();
  }

  getApplicants(){
    this.subscription = this.route.queryParams.subscribe(params => {this.postId = params['id'];});
    this.data.getApplicantsList(this.postId).subscribe(res => {
      this.applicantemails = res;
      this.postName = this.applicantemails[0].name;
      this.hiredApplicants = this.applicantemails[0].hiredapplicants;
      this.populateApplicantDetails();
    });
  }

  populateApplicantDetails(){
    var emails = this.applicantemails;
    this.data.getApplicantsInfo(emails[0].applicantsEmail).subscribe(res => {this.applicants = res;
    
    this.displayStatus();
    });
    
  }

  // This is for display purpose of status
  displayStatus(){
    for (var x in this.applicants){
        var flag = false;
        for (let y of this.hiredApplicants){
          
          if (this.applicants[x].email === y){
            this.applicants[x].poststatus = 'hired';
            flag = true;
            break;
          }
        }
        if (flag == false)
           this.applicants[x].poststatus = 'not hired';
    }
  }

  hireMe(i){
    this.applicants[i].poststatus = 'hired';
    this.data.hire(this.postId, this.applicants[i].email).subscribe(res => {this.applicants = res;});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
