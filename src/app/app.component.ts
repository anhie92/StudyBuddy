import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Study } from './Interfaces/study.interface';
import { NgForm } from '@angular/forms'
import { User } from './Interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GC-Bootcamp-StudyBuddy';
  studies: Study[] = []
  isCanHasAnswer: boolean = false;
  question: string = '';
  answer: string = '';
  truthy: boolean = false;
  isHome: boolean = this.getPathName() === 'Home';
  currentUser: User | null = null;

  constructor(private api: ApiService) { }

  getUser() {
  }

  getPathName() {
    let pathArray = window.location.pathname.split('/');
    return pathArray[
      pathArray.length - 1
    ]
  }

  postStudy(newStudy: NgForm) {
    let study: Study = {
      id: -1,
      question: newStudy.form.value.question,
      answer: newStudy.form.value.answer
    }
    this.api.createStudy(study).subscribe(
      (x) => this.studies.push(x as Study)
    )

    this.getStudies();
  }

  getStudies() {
    this.api.getStudy()
      .subscribe(
        (x) =>
          this.studies = x
      )
  }

  notTruthy() {
    this.truthy = !this.truthy;
    console.log(typeof this.studies)
  }

  ngOnInit(): void {
    this.getStudies()

  }
}
