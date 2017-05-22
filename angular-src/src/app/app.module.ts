import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/profile/profile.component';

import { APP_ROUTES_PROVIDER } from './app.routes';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AddNewAlunoComponent } from './components/admin/questions/add-new-aluno/add-new-aluno.component';
import { AddNewTurmaComponent } from './components/admin/questions/add-new-turma/add-new-turma.component';
import { QuestionsComponent } from './components/admin/questions/questions.component';
import { TruncatePipe } from './pipes/truncate';
import { EditAlunoComponent } from './components/admin/questions/edit-aluno/edit-aluno.component';
import { EditAlternativesComponent } from './components/admin/questions/edit-alternatives/edit-alternatives.component';
import { AlunosComponent } from './components/admin/questions/alunos/alunos.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AddNewAlunoComponent,
    AddNewTurmaComponent,
    QuestionsComponent,
    TruncatePipe,
    EditAlunoComponent,
    EditAlternativesComponent,
    AlunosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTES_PROVIDER,
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
