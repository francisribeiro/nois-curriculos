import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../../pipes/truncate';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {
  alunos: Object;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAllUsers('professor').subscribe(data => {
      this.alunos = data.data;
      console.log(data.data);
    }, err => {
      console.log(err);
      return false;
    });
  }

}
