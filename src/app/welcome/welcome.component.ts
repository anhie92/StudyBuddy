import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Input() loggedInUser: LoggedInUser | null = null;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x as LoggedInUser);
    //this.api.onComponentLoad();
  }
}
