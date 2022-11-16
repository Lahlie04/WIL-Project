import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import swal from "sweetalert2";

@Component({
  selector: 'app-student-site',
  templateUrl: './student-site.component.html',
  styleUrls: ['./student-site.component.scss']
})
export class StudentSiteComponent implements OnInit {

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
    this.userService.getAllLecture().subscribe(
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
    console.log(this.uploadForm.value);

    const student = JSON.parse(localStorage.getItem("user") || '{}') ;

      const data = {
        id: student.id,
        lectureID: this.lectureID
      }

      console.log(data);
    
      const formData = new FormData()
      formData.append('admission', this.admission)


    this.userService.uploadAdmission(data).subscribe(
      res => {
        console.log(res);
        swal.fire(
          {
            icon: 'success',
            title: 'Successful submitted',
            showConfirmButton: false,
            timer: 1900,
             width: '300px'
          }
        ) 
      },
      error =>{
        swal.fire(
          {
            icon: 'success',
            title: 'Successful submitted',
            showConfirmButton: false,
            timer: 1900,
             width: '300px'
          }
        )
      }
    )
  }

  selectThisFile(myEvent: any) {
    this.admission = myEvent.target.files[0]; 
  }

}
