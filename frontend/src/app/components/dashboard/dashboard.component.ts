import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  student: any;
  lectures: any;

  lectureID: any;
  admission: any = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem("user")|| '{}');
    console.log(this.student); 
    this.allLecture();
  }

  uploadForm = new FormGroup({
    admission: new FormControl('')
  });

  

  allLecture(): void{
    this.userService.getAllStudent().subscribe(
      res =>{
        this.lectures = res;
        console.log(res);
        
      },
      error =>{
        throw(error)
      }
    )
  }

  getLectureID(id: any){
    this.lectureID = id;
    console.log("lectureid",this.lectureID);
    
  }


  upload(): void{
    this.uploadForm.reset()
    swal.fire(
      {
        icon: 'success',
        title: 'Submitted',
        showConfirmButton: false,
        timer: 1900,
         width: '300px'
      }
    ) 
  }

  accepted(){
    swal.fire(
      {
        icon: 'success',
        title: 'Accepted',
        showConfirmButton: false,
        timer: 1900,
         width: '300px'
      }
    ) 
  }

  selectThisFile(myEvent: any) {
    this.admission = myEvent.target.files[0]; 
  }

}
