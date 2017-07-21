import {Component, OnInit, Input} from '@angular/core';
import {DataService} from '../../services/data.service'
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Rx";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-category',
  template: `
    <fieldset style="width:400px">
      <legend>Search Job Posts Using</legend>
      <Button (click)='getpostByLocation()'>Current Location</Button>
      <Button (click)='getpostByFee()'>Minimum Fee</Button>
      <select #t (change)="callType(t.value)">
        <option>SelectCategory</option>
        <option *ngFor="let post of allposts|unique">{{post.category}}</option>
      </select>
    </fieldset>
    <table border="1px">
      <tr>
        <th>Category</th>
        <th>Type Of Work</th>
        <th>Date of Work</th>
       <!-- <th>Address</th>-->
        <th>Details</th>
      </tr>
      <tr *ngFor="let post of posts">
        <td>{{post.category}}</td>
        <td id="{{post._id}}">{{post.name}}</td>
        <td>{{post.preferedDate | date:'medium'}}</td>
      <!--  <td>{{post.location}}</td>-->
        <td><a [routerLink]="['postdetail',post._id]">Show Details</a></td>
      </tr>
    </table>

  `,
  styles: []
})
export class CategoryComponent implements OnInit {

  posts;
  email: String = this.auth.getUser().email;
  iputdata;
  catArray;
  category;
  data;

  constructor(private route: ActivatedRoute, private dbService: DataService, private router: Router,private auth:AuthService) {
    this.route.params.subscribe(params => {
      this.category = params['cat']
    });


  }

  myLocation;
  MaxFee;
  allposts;
  selectedCat


  ngOnInit() {
    this.data = {
      "category": this.category,
      "email": this.auth.getUser().email
    }
    this.dbService.getPostByCat(this.data).subscribe(res => {
      this.posts = res;
      console.log(this.posts)
    });
    this.getallPosts();

    console.log(this.auth.getUser().email);

  }

  getpostByLocation() {
    this.router.navigate(['homepage/posts']);
  }

  getpostByFee() {
    this.router.navigate(['homepage/minFeePosts']);

  }


  callType(value) {
    this.selectedCat = value;
    this.getPostByCat();
  }

  getPostByCat() {
    if (this.selectedCat != 'SelectCategory')
      this.router.navigate(['CatPosts/' + this.selectedCat]);
  }


  getallPosts() {
    this.dbService.getallPosts().subscribe(res => {
      this.allposts = res
    });
    ;
  }

}
