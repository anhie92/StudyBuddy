import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {
  static onLogout() {
    throw new Error('Method not implemented.');
  }

  @Input()userName: string = '';
  @Input()password: string = '';
  loginError: boolean = false;
  errorMessage:string = ''
  users: User[] = [];
  @Input() loggedInUser: LoggedInUser | null = null;
  constructor(private api: ApiService) {
    
  }

  isUsers() {
    if (this.users.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  isRegistered(userName: string, password: string) {
    if (!this.isUsers()) {
      return undefined;
    }
    return this.users
      .filter(x => x.userName === userName && x.password === password)[0];
  }

  getUser(userName: string, password: string) {
    let user = this.isRegistered(userName, password);
    if (user) {
      this.api.setUser(user);
    }
    return;
  }
  displayErrorMessage() {
    return this.errorMessage;
  }
  addUser(userName: string, password: string) {
    if (!this.isUsers()) {
      return;
    }
    if(this.users.filter(x=> x.userName === userName)[0]){
      this.errorMessage = 'That username already exists...'
      this.loginError = true;
      this.userName = '';
      this.password = '';
      console.log(this.errorMessage);
      return;
    }
    this.api.registerUser({
      id:-1,
      userName:userName,
      password:password
    });
  }

  onLogout() {
    this.api.onLogout();
    this.loginError = false;
  }

  onLogin(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;
    if(!name || !pass || !this.users.some(x=> x.userName === name && x.password === pass)){
      this.loginError = true;
      this.errorMessage = 'Incorrect username or password...';
      form.resetForm()
      return;
    }
    this.getUser(name, pass)
    if(this.loggedInUser as LoggedInUser){
      let loggedIn = this.loggedInUser as LoggedInUser;
        if(loggedIn.User){
          this.api.setUser(loggedIn.User as User) // passing the currently logged in user back to service so it is globally available, has to be done this way...
          return;
      }
    }
  }
  clearForm(form: NgForm){
    form.resetForm()
  }
  newUser(form: NgForm) {
    let name = form.form.value.userName;
    let pass = form.form.value.password;
    if(!name || !pass){
      this.clearForm(form)
      this.loginError = true;
      this.errorMessage = 'That data is not in the correct format...'
      return;
    }
    if(this.users.filter(x=> x.userName === name)[0]){
      this.errorMessage = 'that username already exists...'
      this.loginError = true;
      this.clearForm(form)
      return;
    }
    this.api.registerUser({
      id:-1,
      userName:name,
      password:pass
    })
    this.api.setUser({
      id:-1,
      userName:name,
      password:pass
    }) // passing the currently logged in user back to service so it is globally available, has to be done this way...
  }
  
  ngOnInit(): void {
    this.api.getAllUsers().subscribe((x) => this.users = x);
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
  }
}


