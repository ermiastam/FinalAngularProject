import { ElementRef, NgZone, ViewChild, Component, OnInit, NgModule } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup, FormArray} from "@angular/forms";
import {Observable} from 'rxjs/Rx';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from'@types/googlemaps';

import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service"

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  //styleUrls: ['./postjob.component.css']
  styles: [`
    agm-map {
      height: 100px;
    }
  `]
})
export class PostjobComponent implements OnInit {
  coords;
  locs2=[];
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
 // addPostForm:FormGroup;
  @ViewChild("search")
  public searchElementRef: ElementRef;
   categories:string[]=['Developer','Tester','Education','Pharmacy'];
  myForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private auth:AuthService,private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone) {

    this.myForm = fb.group({
      'name': ['', Validators.required],
      'email': [auth.getUser().email, Validators.required],
      'category': ['', Validators.required],
      'description': ['', Validators.required],
      'locations': ['', Validators.required],
      //'location': [this.locs2],
      'duration': ['', Validators.required],
      'hourlyFee': ['', Validators.required],
      'preferredDate': ['', Validators.required],
      'preferredTime': ['', Validators.required],
      'postStatus': ['active', Validators.required],
      // "hiredapplicants": [[], Validators.required],
      'applicantsEmail': [[]]
    });
  }
  onSubmit() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.locs2 = [this.longitude, this.latitude];
    // this.coords = {
    //   coordinates: locs2
    // }
    var getLocation = this.myForm.get('locations');
    this.myForm.controls['locations'].setValue(this.locs2);
    this.dataService.savedata(this.myForm.value).subscribe((data)=>data.json(), error=>console.error(error));

    console.log("Name1"+ " "+ this.myForm.value);
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  ngOnInit() {

    console.log('post a job container');
  }

}
