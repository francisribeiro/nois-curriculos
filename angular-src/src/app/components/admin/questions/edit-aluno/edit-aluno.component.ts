import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidateService } from '../../../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-aluno',
  templateUrl: './edit-aluno.component.html'
})
export class EditAlunoComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  type: String;
  selectUndefinedOptionValue: any;
  types = [
    { id: 'aluno', name: "Aluno" }
  ];

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.take(1).subscribe((params: any) => {
      this.username = params['username'];
    });
  }

  ngOnInit() {
    this.authService.getUserByUsername(this.username).subscribe(data => {
      this.name = data.data.name;
      this.email = data.data.email;
      this.type = data.data.type;
    }, err => {
      console.log(err);
      return false;
    });
  }

  onRegisterSubmit() {

    const user = {
      name: this.name,
      email: this.email,
      type: this.type,
      username: this.username
    }

    // Required fields
    if (!this.validateService.validateEditUser(user)) {
      this.flashMessage.show('Por Favor, preencha todos os campos!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Update User
    this.authService.updateUser(user).subscribe(data => {
      if (data.status == "success") {
        this.flashMessage.show('Aluno Atualizado com sucesso', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate([`/alunos`]);
      } else {
        this.flashMessage.show('Algo deu errado ao Atualizar o Aluno!', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate([`/alunos/edit/${this.username}`]);
      }
    });
  }
}
