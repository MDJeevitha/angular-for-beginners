import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router,
  
    ) { }

  ngOnInit(): void { 
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password: ['', Validators.required]
    })
  } 

  hideShowPass(){ 
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
   }

   onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      
      // Send the object to database
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
           alert("Something went wrong!");
          console.log(err);
        },
      });
    }else{

      // console.log("Form is not valid"); previously it was there
         
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is not valid");
      // throw the error using toaster and with required fields.
    }
   }

  // private validateAllFormFields(formGroup:FormGroup){
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if(control instanceof FormControl) {
  //       control.markAsDirty({ onlySelf: true});
  //     }
  //     else if(control instanceof FormGroup) {
  //       this.validateAllFormFields(control)
  //     }
  //   })
  // }


}
