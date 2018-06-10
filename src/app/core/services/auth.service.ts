import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { CoreModule } from '../core.module';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  authState: FirebaseAuthState = null;

  constructor(private af: AngularFire,
              private db: AngularFireDatabase,
              private router: Router) {
                af.auth.subscribe((auth) => {
                  this.authState = auth;
                });
               }

  // returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // returns current user
  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

  // returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // returns current user display name
  get currentUserDisplayName(): string {
    if (!this.authenticated) {return 'GUEST';}
    else {return this.authState.auth.displayName || 'OAUTH USER';}
  }

  githubLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Github);
  }

  googleLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Google);
  }

  facebookLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.Facebook);
  }

  emailLogin(): firebase.Promise<FirebaseAuthState> {
    return this.socialSignIn(AuthProviders.email);
  }

  private socialSignIn(provider: number): firebase.Promise<FirebaseAuthState> {
    return this.af.auth.login({provider, method: AuthMethods.Popup})
    .then(() => this.updateUserData())
    .catch(err => console.log(err));
  }

  private updateUserData() {
    let path = `users/${this.currentUserId}`;
    let data = {
      name: this.currentUser.displayName,
      email: this.currentUser.email
    }
    this.db.object(path).update(data)
    .catch((err) => console.log(err));
  }

  // loginWithGoogle() {
  //   return this.af.auth.login({
  //     provider: AuthProviders.Google,
  //     method: AuthMethods.Popup
  //   });
  // }

  logout() {
    return this.af.auth.logout();
  }
}
