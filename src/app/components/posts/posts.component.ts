import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts;
  email;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.getJobList();
  }

  getJobList() {
    this.subscription = this.route.queryParams.subscribe(params => {this.email = params['email'];});
    this.data.getJobsList(this.email).subscribe(res => {this.posts = res;});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
