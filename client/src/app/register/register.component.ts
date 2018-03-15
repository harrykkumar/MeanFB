import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,NgForm,FormControl, Validators} from '@angular/forms'
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	form : FormGroup;
  messageClass;
message;processing= false;
emailValid= false;
emailMessage;
usernameValid = false;
usenameMessage;

  constructor(private router:Router,
  	private formBuilder : FormBuilder ,private authService : AuthService
  ) {
  	
  }

    ngOnInit() {
    this.creatForm(); 
  
}
creatForm(){
  console.log(this.form,"create")
      this.form = this.formBuilder.group({
    email:  new FormControl(null,Validators.required),
    username: new FormControl(null,Validators.required),
    password: new FormControl(null,Validators.required),
    confirm:new FormControl(null,Validators.required)
})
}
disableFormFields(){
  this.form.controls['email'].disable();
  this.form.controls['username'].disable();
  this.form.controls['password'].disable();
  this.form.controls['confirm'].disable();

}
enabledFormFields(){
  this.form.controls['email'].enable();
  this.form.controls['username'].enable();
  this.form.controls['password'].enable();
  this.form.controls['confirm'].enable();
}

onRegisterSubmit(form: NgForm){ 
       this.disableFormFields();
        this.processing= true;
          const user={
              email : this.form.get('email').value ,
             username : this.form.get('username').value ,
             password : this.form.get('password').value 
        }
            this.authService.registerUser(user).subscribe(data=>{
              if(!data.success){
                 this.messageClass ='alert alert-danger';
                this.message = data.message;
                this.processing= false;
                this.enabledFormFields();
              }else{
                   this.messageClass ='alert alert-success';
                  this.message = data.message;
                  this.processing= true;
                      setTimeout(()=>{
            this.router.navigate(['/home']);
            },2000)
              }

       })
        
           
}

emailcheckDuplicate(){
  this.authService.checkEmailDuplicate(this.form.get('email').value).subscribe(data=>{
    if(!data.success){
      this.emailValid= false;
      this.emailMessage = data.message;
    }
    else{
       this.emailValid= true;
      this.emailMessage = data.message;
    }
  })

}
usernamecheckDuplicate(){
    this.authService.checkUserNameDuplicate(this.form.get('username').value).subscribe(data=>{
    if(!data.success){
      this.usernameValid= false;
      this.usenameMessage = data.message;
    }
    else{
       this.usernameValid= true;
      this.usenameMessage = data.message;
    }
  })
}
}
