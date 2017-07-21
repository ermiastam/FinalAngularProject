import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DataService} from '../../services/data.service';
import { Response } from '@angular/http'

@Component({
  selector: 'app-employer-details',
  template: `
    <h3>
      Employer's Details
    </h3>


 <table border="1px">

     <tr *ngIf="JobOwnerDetail"><td>Name:{{JobOwnerDetail.name}}</td></tr>
     <tr *ngIf="JobOwnerDetail"><td>Email:{{JobOwnerDetail.email}}</td></tr>
     <tr *ngIf="JobOwnerDetail"><td>PhoneNumber:{{JobOwnerDetail.PhoneNumber}}</td></tr>
     <tr *ngIf="JobOwnerDetail"><td>Address:{{JobOwnerDetail.location}}</td></tr>   
     <tr *ngFor="let eval of JobOwnerDetail.evaluation"><td>Comments:{{eval.comment}}</td></tr>
     <tr *ngFor="let eval of JobOwnerDetail.evaluation"><td>rating:{{eval.rating}}</td></tr>
    
 </table>
 
  `,
  styles: []
})
export class EmployerDetailsComponent  {
email;
JobOwnerDetail:any=[];
  constructor(private route:ActivatedRoute,private dbService:DataService) {
      this.route.params.subscribe(params => {
        this.email = params['email'];       
        this.dbService.getJobOwner(this.email).map(d=>d.json()).subscribe(data=>{
          this.JobOwnerDetail = data[0];
         
        }); 
      });
        
   

     //this.getJobOwner();
    //  
  }
     
     
  
 


// getJobOwner(){
//   this.dbService.getJobOwner(this.email).subscribe((res:Response)=>{this.JobOwnerDetail = res[0]
//     console.log(this.JobOwnerDetail)
// }); 
// }
 

  ngOnInit() {
    //this.route.params.subscribe(params => {this.email = params['email']} );
  }

}
