import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  // Injecting form builder and injecting auth service from services folder

  constructor(private fb : FormBuilder, private auth :AuthService, private router: Router  ) { }


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required],
      
    })

   }


  hideShowPass(){ 
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
   }

  onSignup(){
    if(this.signUpForm.valid){

      //perform logic dor signup

      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res => {
         alert(res.message);
         this.signUpForm.reset(); // To refresh the form
         this.router.navigate(['login']);  // to navigate the login page using router
        })
        ,error:(err => {
          alert(err?.error.message);
        })
    })
      console.log(this.signUpForm.value)
    }else{
      // logic for throwing error
      
      ValidateForm.validateAllFormFields(this.signUpForm)
      alert("your form is not valid");
    }
  }

  //   private validateAllFormFields(formGroup:FormGroup){
  //   Object.keys(formGroup.controls).forEach(field => {
  //      const control = formGroup.get(field);
  //      if(control instanceof FormControl) {
  //        control.markAsDirty({ onlySelf: true});
  //      }
  //      else if(control instanceof FormGroup) {
  //        this.validateAllFormFields(control)
  //      }
  //   })
  // }


}
