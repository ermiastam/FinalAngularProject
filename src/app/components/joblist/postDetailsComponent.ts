import {Component, OnInit, Input, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service'
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'pst-detail',
  template: `
    <table border='1px'>

      <tr>
        <td *ngIf="post">Type: {{post.name}}</td>
      </tr>
      <tr>
        <td *ngIf="post">Ctegory: {{post.category}}</td>
      </tr>
      <tr>
        <td *ngIf="post">Description: {{post.description}}</td>
      </tr>
      <tr>
        <td *ngIf="post">Duration: {{post.duration}}</td>
      </tr>
      <tr>
        <td *ngIf="post">HourlyFee: {{post.hourlyFee}}</td>
      </tr>
      <tr>
        <td *ngIf="post">PreferedDate: {{post.preferedDate}}</td>
      </tr>
      <tr>
        <td *ngIf="post">Post Status: {{post.postStatus}}</td>
      </tr>
      <tr>
        <td *ngIf="post"><a [routerLink]="['employer',post.email]">Employer's Details</a>
      </tr>
      <tr>
        <td>
          <Button *ngIf="post && flag2" [disabled]="flag" (click)="applyForJob()">Apply</Button>
        </td>
      </tr>
    </table>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class postDetailsComponent {
  id;
  post;
  value;
  response;
  data: Object;
  email;
  flag;
  data2: Object;
  flag2 = true;


  constructor(private route: ActivatedRoute, private dbService: DataService, private auth: AuthService) {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });
    this.dbService.getPost(this.id).subscribe(res => {
      this.post = res
    });
    //this.checkIfApplied();

  }


  applyForJob() {
    this.data = {
      "id": this.id,
      "email": this.auth.getUser().email
    }

    this.dbService.applyForJob(this.data).subscribe(res => {
      this.response = res
    });
    this.flag2 = false;
  }

  checkIfApplied() {
    this.data2 = {
      "id": this.id,
      "email": this.auth.getUser().email
    }

    this.dbService.checkIfApplied(this.data2).subscribe(res => {
      this.flag = res
    });

  }


}
