import {Component} from "@angular/core";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myImage: string;
  userId:string;

  constructor(public auth: AuthService) {
    this.auth.loggedIn.subscribe(profile => {
        console.log(JSON.stringify(profile));

        this.myImage = profile.picture;
        console.log("myimage" + this.myImage);
        this.userId=profile.sub;
        console.log("User ID"+this.userId);

      }
    );


  }

  title = 'app';


}
