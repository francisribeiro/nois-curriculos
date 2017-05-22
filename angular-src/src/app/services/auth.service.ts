import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  questionTitle: any;

  constructor(private http: Http) { }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // User
  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers })
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers })
      .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getAllUsers(type) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/users/list/${type}`, { headers: headers })
      .map(res => res.json());
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Question
  registerQuestion(newQuestion) {
    let headers = new Headers();
    this.questionTitle = newQuestion.question;
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/questions/', newQuestion, { headers: headers })
      .map(res => res.json());
  }

  getQuestion() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/questions/q/${this.questionTitle}`, { headers: headers })
      .map(res => res.json());
  }

  getQuestionId() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/questions/q-id/${this.questionTitle}`, { headers: headers })
      .map(res => res.json());
  }


 getUserByUsername(username) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/users/u-s/${username}`, { headers: headers })
      .map(res => res.json());
  }

  updateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`http://localhost:3000/users/`, user, { headers: headers })
      .map(res => res.json());
  }

  deleteUser(username) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:3000/users/u/${username}`,{ headers: headers })
      .map(res => res.json());
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Alternatives
  registerAlternative(newAlternative) {
    console.log(newAlternative);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/alternatives/', newAlternative, { headers: headers })
      .map(res => res.json());
  }

  getAllAlternatives(questionId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/alternatives/list/${questionId}`, { headers: headers })
      .map(res => res.json());
  }

   UpdateAlternative(newAlternative) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`http://localhost:3000/alternatives/${newAlternative.id}`, newAlternative, { headers: headers })
      .map(res => res.json());
  }
}
