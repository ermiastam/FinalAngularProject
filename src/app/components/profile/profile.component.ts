import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user = {
    name: this.auth.getUser().name,
    email: this.auth.getUser().email,
    address: '',
    picturename: this.auth.getUser().picture,
    phonenumber: '',
    poststatus: '',
    evaluation: ''
  };

  constructor(public auth: AuthService,private formBuilder:FormBuilder,private dataService:DataService) {
    this.userForm = formBuilder.group({

      'address': ['', Validators.required],
      'phonenumber': ['', Validators.required],

    });
  }

  ngOnInit() {
  }
  onSubmit(){

    console.log(this.user.email);

    this.dataService.saveUser(this.user).subscribe((data)=>data.json(), error=>console.error(error));


  }

}
