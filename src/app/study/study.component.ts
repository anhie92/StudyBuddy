
import { 
  Component,
   ElementRef,
    Input,
     OnInit,
      Renderer2,
       HostListener,
        EventEmitter,
         Output } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggedInUser } from '../Interfaces/loggedInUser.interface';
import { Study } from '../Interfaces/study.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css'],
  animations: [

    trigger('answerState', [
      state('show', style({
        'opacity': '1',
        'transform': 'translateX(0)'
      })),
      state('hidden', style({
        'opacity': '0',
        'transform': 'translateX(1200px)'
      })),
      transition('show => hidden', animate(400)),
      transition('hidden => show', animate(400)),

    ])
  ]
})
export class StudyComponent implements OnInit {
  answerState = 'hidden';
  @Input() study: Study | null = null;
  isCanHasAnswer: boolean = false;
  @Input()showAll: boolean = true;
  @Input() loggedInUser: LoggedInUser | null = null;
  @Input() index: number = 0;
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private api: ApiService, private render: Renderer2, el: ElementRef) { }

  answerTransition(e: MouseEvent) {
    this.isCanHasAnswer = !this.isCanHasAnswer;
    this.answerState = this.isCanHasAnswer ? 'show' : 'hidden';

  }
  onShowAll() {
    if(this.showAll){
      this.isCanHasAnswer = true;
      this.answerState = 'show';
    }else{
      this.isCanHasAnswer = this.isCanHasAnswer;
      this.answerState = this.answerState;
    }
  }
  fravritClicked(e: MouseEvent) {
    this.study = this.study as Study
    this.api.selectFavorite(this.study.id);
    return this.clicked.emit(true);
  }

  ngOnInit(): void {
    this.api.loggedInEvent
    .subscribe((x) => this.loggedInUser = x);

    this.api.showAnswersEvent
    .subscribe(
      (x)=>{
        if(x) {
          this.isCanHasAnswer = true;
          this.answerState = 'show';
        }else{
          this.isCanHasAnswer = false;
          this.answerState = 'hidden';
        }
      })
  }
}
