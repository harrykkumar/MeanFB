import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import { Router }  from '@angular/router';
// import { FlashMessagesService } from 'angular2-flash-messages';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( public authService:AuthService , public  router :Router) { }

  ngOnInit() {

  }
onClickLogout(){
	this.authService.logout();
	// this.notificationShow.show('You are logged out!',{cssClass :'alert-info'});
	this.router.navigate(['/home']);

}
}
