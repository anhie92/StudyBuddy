import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
  @Input() loggedInUser: LoggedInUser | null = null;
  
  constructor(private api: ApiService) { }
  homeComponentDoorbell(e:MouseEvent){
    this.api.homeComponentDoorbell(e);
  }
  ngOnInit(): void {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x as LoggedInUser);
  }
}


