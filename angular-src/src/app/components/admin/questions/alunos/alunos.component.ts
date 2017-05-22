import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { TruncatePipe } from '../../../../pipes/truncate';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos: Object;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getAllUsers('aluno').subscribe(data => {
      this.alunos = data.data;
      console.log(data.data);
    }, err => {
      console.log(err);
      return false;
    });
  }

   public delete(event, username) {
        // Register users
    this.authService.deleteUser(username).subscribe(data => {
      if (data.status == "success") {
        this.flashMessage.show('Aluno Deletado com sucesso!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/alunos']);
      } else {
        this.flashMessage.show('Algo deu errado ao deletar o aluno!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/alunos']);
      }
    });
  }

}
