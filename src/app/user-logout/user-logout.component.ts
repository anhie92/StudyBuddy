import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})

export class UserLogoutComponent implements OnInit {

@Input() loggedInUser: LoggedInUser | null = null;
constructor(private api: ApiService, private router:Router) {    
  }
  
  loginError: boolean = false;

  ngOnInit(): void {
    this.onLogout();
    setTimeout(() => {
      this.router.navigate(['user-login']);
    }, 2000);
   
  }
  onLogout() {
    this.api.onLogout();
    this.loginError = false;    
  }
}
