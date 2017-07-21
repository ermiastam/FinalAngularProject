import { ElementRef, NgZone, ViewChild, Component, OnInit, NgModule } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {PostjobComponent} from "../postjob/postjob.component";
import {MdDialog} from "@angular/material";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';

import { } from'@types/googlemaps';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  //styleUrls: ['./homepage.component.css']
  styles: [`
    agm-map {
      height: 300px;
    }
  `]
})
export class HomepageComponent implements OnInit {
  emailval="";

  public latitude: number;
  public longitude: number;
  value2;
 // public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(public auth: AuthService,public dialog:MdDialog, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private dataService:DataService) {
    // this.emailval = this.auth.getUser().email;
  }
  openDialog(){
   this.dialog.open(PostjobComponent);
  }

  ngOnInit() {
    // this.emailval = this.auth.getUser().email;
    this.auth.handleAuthentication();
    // console.log(this.auth.getUser());

      //set google maps defaults
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

       this.setCurrentPosition();

    }

  private setCurrentPosition() {
    var date = new Date();
    console.log(date.toISOString());
      if ("geolocation" in navigator) {
        console.log("from set current ");
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
          console.log("this long "+this.longitude);
         this.dataService.getMyPostLonLat(this.latitude, this.longitude).subscribe((data)=>{this.value2=data.json(), console.log("json data "+data.json())}, error=>console.error(error));
          console.log("val "+this.value2);
         setTimeout((val)=>{console.log(" val2 "+this.value2)}, 10000);
        });

      }

    }

  }



