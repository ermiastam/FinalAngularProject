import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-hiredapplicant',
  templateUrl: './hiredapplicant.component.html',
  styleUrls: ['./hiredapplicant.component.css']
})
export class HiredapplicantComponent implements OnInit {

  applicant;
  email;
  postId;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.getHiredDetail();
  }

  getHiredDetail(){
    this.route.parent.queryParams.subscribe(params => {this.email = params["email"];
    this.postId = params["postId"];
  });

  this.data.hire(this.postId, this.email).subscribe(res => {
     this.applicant = res;
     //this.router
  });
  }

}
