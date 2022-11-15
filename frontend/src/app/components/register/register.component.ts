import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  haveData: boolean = false;
  message: any = '';
  isMessage: boolean = false;
  passwordMessage: any = '';
  password_matched: boolean = false;
  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");


  file: any = '';
  spinnerState:boolean=false;

  isLoading: boolean = false;

  constructor(private fb : FormBuilder,
    private authService: AuthService,
    private router:Router,
    private ngxService: NgxUiLoaderService) { }
    
  

  ngOnInit(): void {
   
  
    this.registerForm = new FormGroup({
      role: new FormControl('',[Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
      stuff_no: new FormControl(''),
      student_no: new FormControl(''),
  });
  }
  fieldsWithData(): boolean{
    if((this.registerForm.value.name && this.registerForm.value.lastname) && (this.registerForm.value.email && this.registerForm.value.password) && (this.registerForm.value.confirm_password) != "" ){
      return true;
    }
    else{
      return false;
    }
  
  }
  passwordMatch(): boolean {
    if(this.registerForm.value.confirm_password === this.registerForm.value.password){
      return true;
    }
    else{
      this.passwordMessage = "Passwords do not match";
      return false;
    }
  }
  messages(): void {
    if(this.fieldsWithData()){
      this.message = "";
    }
    else{
      this.message = "Fields cannot be empty"
    }
  }
  ifSTUDENT(): Boolean{
    if(this.registerForm.value.role === "STUDENT"){
      return true;
    }
    else{
      return false;
    }
  }
  ifLECTURE(): Boolean{
    if(this.registerForm.value.role === "LECTURE"){
      return true;
    }
    else{
      return false;
    }
  }

  get Form() {
    return this.registerForm.controls;
  }

  submit(): void{
    console.log(this.registerForm.value);
    if(this.passwordMatch()) {
      this.messages();
     
      this.isLoading = true;
     
      console.log(this.registerForm.value);
      
      this.authService.register(this.registerForm.value)
      .subscribe({
       next: res=>{

        if (res == null){
          this.isLoading = false;
          this.router.navigate(['/register']);
          return 1 
        }
        this.isLoading = false;
        return this.router.navigate(['/login']);
       },
        error: err => {
          this.isLoading = false;
          throw err;
          
      }
      })
    } 
  }
}
