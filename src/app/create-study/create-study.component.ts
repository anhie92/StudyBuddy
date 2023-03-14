import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Study } from '../Interfaces/study.interface';
import { NgForm } from '@angular/forms';
import { User } from '../Interfaces/user.interface';

@Component({
  selector: 'app-create-study',
  templateUrl: './create-study.component.html',
  styleUrls: ['./create-study.component.css']
})
export class CreateStudyComponent implements OnInit {
  studies: Study[] = [];
  currentUser: User | null = null;
  errorMessage = '';
  successMessage='';
  constructor(private api: ApiService) { }
  postStudy(newStudy: NgForm) {
    let study: Study = {
      id: -1,
      question: newStudy.form.value.question,
      answer: newStudy.form.value.answer
    }
    if(this.studies.filter(x=> x.question === study.question && x.answer === study.answer)[0]){
      newStudy.resetForm()
      this.errorMessage = 'Question already exists!'
      this.successMessage="";
    }else{
    this.api.createStudy(study).subscribe(
      response => {
        if(response){
          console.log(response)
          this.successMessage = 'Data added successfully!';
          this.errorMessage="";
          newStudy.resetForm()
          
        // }else{
        //   this.errorMessage = "BRRRRRRRRRRRRRRRRRRRRRRRRR";
        }
        
      },);
    }
    this.getStudies();
  }

  getStudies() {
    this.api.getStudy()
      .subscribe(
        (x) =>
          this.studies = x
      )
  }
  ngOnInit(): void {
    this.getStudies();
  }

}
