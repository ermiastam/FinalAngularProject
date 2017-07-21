import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {AuthHttp} from "angular2-jwt";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  posts: any;
  value;

  constructor(private http: Http,private authHttp:AuthHttp) {
  }

  port: string = "http://localhost:5001/api";
  portMyPosts: string = "http://localhost:5001/myposts";
  //Robel's
  //Searching all jobs posted by the logged in user
  getJobsList(email) {
    return this.authHttp.get(this.portMyPosts + '/searchposts/' + email).map(res => res.json());
  }

  //Searching the applicants of post - postid
  getApplicantsList(postid) {
    return this.authHttp.get(this.portMyPosts + '/searchposts/postapplicants/' + postid).map(res => res.json());
  }

  getApplicantsInfo(emails) {
    var obj = {"emails": emails};
    return this.authHttp.post(this.portMyPosts + '/searchposts/postapplicants/', obj).map(res => res.json());
  }

  // Getting details of an applicant
  getApplicantDetail(applicantId) {
    return this.authHttp.get(this.portMyPosts + '/searchposts/postapplicants/detail/' + applicantId).map(res => res.json());
  }

  hire(postid, email) {
    var obj = {"postid": postid, "email": email};
    return this.authHttp.post(this.portMyPosts + '/searchposts/postapplicants/hire', obj).map(res => res.json());
  }

  //Ermias's

  // getPosts(email) {
  //   //console.log("http://localhost:5001/api/posts/"+email);
  //   var posts = this.authHttp.get("http://localhost:5001/api/posts/" + email).map(res => res.json());
  //
  //   return posts
  // }
  data1;
  getpostByLocation(lat,long,email){

    this.data1= { "lat":lat,
      "long":long,
      "email":email }

    return this.authHttp.post("http://localhost:5001/api/posts",this.data1).map(res=>res.json())

  }

  getPostsByFee(email) {
    var post = this.authHttp.get("http://localhost:5001/api/posts/byfee/" + email).map(res => res.json());

    return post;
  }


  getPost(id) {
    var post = this.authHttp.get("http://localhost:5001/api/posts/post/" + id).map(res => res.json());

    return post;
  }

  applyForJob(data2: Object) {
    return this.authHttp.post("http://localhost:5001/api/posts/apply", data2).map(res => res.json());
  }

  checkIfApplied(data3: Object) {
    return this.authHttp.post("http://localhost:5001/api/posts/check/", data3).map(res => res.json());

  }

  getJobOwner(email) {
    //console.log(`calling http://localhost:5001/api/posts/jobOwner/${email}`)
    return this.authHttp.get("http://localhost:5001/api/posts/jobOwner/" + email);
  }

  getallPosts() {
    return this.authHttp.get("http://localhost:5001/api/posts").map(res => res.json());
  }

  getPostByCat(data4) {
    //console.log('http://localhost:5001/api/posts/category'+data4.email);
    return this.authHttp.post("http://localhost:5001/api/posts/category", data4).map(res => res.json());
  }



  //Nolawe's
  getMyPostLonLat(lat, lon) {
    //console.log("lat " + lat + " long " + lon);
    var val = {longitude: lon, latitude: lat};
    return this.authHttp.post(this.port + "/getposts", val);

  }

  savedata(data: any) {

    return this.authHttp.post('http://localhost:5001/api/savePosts', data);

  }

  //manoj
  saveUser(user) {
    console.log(user);
    return this.authHttp.post('http://localhost:5001/users/saveUser', user);

  }

}
