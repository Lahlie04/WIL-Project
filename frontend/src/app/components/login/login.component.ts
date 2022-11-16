import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private service: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.loginForm;
  }

  onChange() { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    // ,role_id: new FormControl('1')
  });

  get Form() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading = true;

    this.service.login(this.loginForm.value).subscribe(
      {next: res => {
        
      if (res == null){
        this.router.navigate(['/register']);
        return 1;//this.toastr.error("somthing went wrong");
      }
      var myobject:any={
        token:"",user:{}
      };
       
      myobject=res;
      console.log(myobject);
      
      if (myobject){
        localStorage.setItem("user",JSON.stringify(myobject.user));
        localStorage.setItem("auth-token",myobject.token); 
        if(myobject.user.role==="STUDENT"){  
            return this.router.navigate(['/student']);
        }else if (myobject.user.role==="LECTURE"){
           
            return this.router.navigate(['/interpreterbooking']);
        }
      }
      this.isLoading = false;
        return 1;
    },
    error: err => {
      console.log(err);
      this.isLoading = false;
    }})
}

}

