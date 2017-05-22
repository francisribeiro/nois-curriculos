import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-aluno',
  templateUrl: './add-new-aluno.component.html'
})
export class AddNewAlunoComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  type: String;
  selectUndefinedOptionValue: any;
  types = [
    { id: 'aluno', name: "Aluno" }
  ];

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      type: this.type
    }

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Por Favor, preencha todos os campos!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Por favor, use um email válido!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register users
    this.authService.registerUser(user).subscribe(data => {
      if (data.status == "success") {
        this.flashMessage.show('Aluno registrado com sucesso!', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/alunos']);
      } else {
        this.flashMessage.show('Algo deu errado ao registrar o aluno!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/aluno/add']);
      }
    });
  }
}
