import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  // social login

  signInWithGithub(): void {
    this.authService.githubLogin()
    .then(() => this.afterSignIn())
  }

  signInWithGoogle(): void {
    this.authService.googleLogin()
    .then(() => this.afterSignIn())
  }

  signInWithFacebook(): void {
    this.authService.facebookLogin()
    .then(() => this.afterSignIn())
  }

  signInWithEmail(): void {
    this.authService.emailLogin()
    .then(() => this.afterSignIn())
  }

  afterSignIn() {
    
  }

}
