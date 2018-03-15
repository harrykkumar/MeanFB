import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,NgForm,FormControl, Validators} from '@angular/forms'
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
import { ProfileComponent}  from '../profile/profile.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 messageClass;
message;
processing= false;
form : FormGroup;
usernameMessage;


  constructor(private router:Router,
  	private formBuilder : FormBuilder ,private authService : AuthService
  ) {
  	this.createForm()
  }

  ngOnInit() {
  }

createForm(){
	this.form = this.formBuilder.group({
	email : new FormControl(null , Validators.required),
	password: new FormControl(null ,Validators.required)

	})
}
disabledForm(){
	this.form.controls['email'].disable();
	this.form.controls['password'].disable();
}
enabledForm(){
	this.form.controls['email'].enable();
	this.form.controls['password'].enable();
}

onLoginSubmit(){
	this.processing= true;
	this.disabledForm();
          const user={
              email : this.form.get('email').value ,
             password : this.form.get('password').value 
        }
        this.authService.login(user).subscribe(data=>{
        	if(!data.success){
        		this.messageClass = 'alert alert-danger';
                this.message = data.message;
                this.processing= false;
                this.enabledForm();
        	}
        	else{
        		this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.processing= true;
                                setTimeout(()=>{
            this.router.navigate(['/profile']);
            },2000)
          this.authService.storeUserData(data.token,data.user);
        	}

        })
        
}

}
