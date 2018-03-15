import { Injectable } from '@angular/core';
import {HttpModule,Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
	domain ="http://127.0.0.1:8080";
authToken;token;options;
user;headers;
  constructor(
  	private http : Http) { }

createAuthenticationHeaders(){
//this.loadToken();
this.authToken = localStorage.getItem('token');
this.options = new RequestOptions({
  headers:new Headers({
    'content-Type':'application/json',
    'authorization':this.authToken
  })

})
};

loadToken(){
 this.authToken = localStorage.getItem('token');
   
}
  registerUser(user){
 return this.http.post(this.domain + '/authentication/register' , user).map(res=>res.json());
  }
  checkUserNameDuplicate(username){
 return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res=>res.json());
  }
    checkEmailDuplicate(email){
 return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res=>res.json());
  }
      login(user){
 return this.http.post(this.domain + '/authentication/login' , user).map(res=>res.json());
  }

logout(){
  this.authToken = null;
    this.user = null;
    localStorage.clear();

}

storeUserData(token,user){
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken = token;
  this.user = user;

}
getProfile(){
this.createAuthenticationHeaders();
 return this.http.get(this.domain + '/authentication/profile',this.options ).map(res=>res.json());

}


}
