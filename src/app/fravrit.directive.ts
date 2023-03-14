import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';
import { ApiService } from './api.service';
import { LoggedInUser } from './Interfaces/loggedInUser.interface';


@Directive({
  selector: '[appFravrit]'
})
export class FravritDirective implements OnInit {
  loggedInUser: LoggedInUser | null = null;
  constructor(
    private render: Renderer2,
    private el: ElementRef,
    private api: ApiService
  ) { }
  validateLoginStatus() {
    //this.currentUser = this.api.giveCurrentUser();
    return this.loggedInUser !== null;
  }

  setFavorites() {
    if (!this.validateLoginStatus()) {
      return;
    }
    let target = this.el.nativeElement as HTMLElement
    let parent = target.parentElement?.parentElement as HTMLElement;
    let question = parent.innerText.toLowerCase().trim()
    if (this.loggedInUser?.Favorites.some(x => x.question.trim().toLowerCase() === question)) {
      this.render.setStyle(
        target,
        'color',
        'pink'
      )
      return;
    }
    this.render.setStyle(
      target,
      'color',
      'grey'
    )
  }
  @HostListener('document:click', ['$event']) getPink(e: MouseEvent) {
    this.setFavorites()
    let target = this.el.nativeElement;
    let isTarget = target === e.target as HTMLElement;
    if (!isTarget) {
      return;
    }
    if (!this.validateLoginStatus()) {
      alert("You must login first before you can select fravrits!");
      return;
    }
    if (target.style.color !== 'pink') {
      this.render.setStyle(
        target,
        'color',
        'pink'
      )
      //this.api.onComponentLoad();
    } else {
      this.render.setStyle(
        target,
        'color',
        'grey'
      )
      //this.api.onComponentLoad();
    }
  }
  ngOnInit(): void {
    this.api.loggedInEvent.subscribe((x) => this.loggedInUser = x);
    this.api.onComponentLoad();
    this.setFavorites();
  }
}



