import { Routes, RouterModule } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AddNewAlunoComponent } from './components/admin/questions/add-new-aluno/add-new-aluno.component';
import { AddNewTurmaComponent } from './components/admin/questions/add-new-turma/add-new-turma.component';
import { QuestionsComponent } from './components/admin/questions/questions.component';
import { EditAlternativesComponent } from './components/admin/questions/edit-alternatives/edit-alternatives.component';
import { EditAlunoComponent } from './components/admin/questions/edit-aluno/edit-aluno.component';
import { AlunosComponent } from './components/admin/questions/alunos/alunos.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'aluno/add', component: AddNewAlunoComponent, canActivate: [AuthGuard] },
    { path: 'turma/add', component: AddNewTurmaComponent, canActivate: [AuthGuard] },
    { path: 'question', component: QuestionsComponent, canActivate: [AuthGuard] },
    { path: 'alunos/edit/:username', component: EditAlunoComponent, canActivate: [AuthGuard] },
    { path: 'alternatives/edit/:id', component: EditAlternativesComponent, canActivate: [AuthGuard] },
    { path: 'alunos', component: AlunosComponent, canActivate: [AuthGuard] }


];

export const APP_ROUTES_PROVIDER = RouterModule.forRoot(APP_ROUTES);