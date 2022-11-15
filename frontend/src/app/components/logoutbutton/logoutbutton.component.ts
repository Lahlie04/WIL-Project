import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutbutton',
  templateUrl: './logoutbutton.component.html',
  styleUrls: ['./logoutbutton.component.scss'],
})
export class LogoutbuttonComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    
    this.router.navigate(['/']);
  }
}