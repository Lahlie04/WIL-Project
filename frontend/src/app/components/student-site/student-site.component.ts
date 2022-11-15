import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-site',
  templateUrl: './student-site.component.html',
  styleUrls: ['./student-site.component.scss']
})
export class StudentSiteComponent implements OnInit {

  student: any;
  constructor() { }

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem("user")|| '{}');
    console.log(this.student);
    
  }

}
