import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  customName?: string;
  collections?: any;
}


@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  emailLogin(email: string, password: string) {
    // TODO: refactor this method
    // email and password is valid
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      this.updateUserData(credential.user);
     })
      .catch(
      //  Проверять пароль
        error => this.handleError(error) 
      );
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
        this.router.navigate(['/dashboard']);
      });
  }

    // If error, console log and notify user
    private handleError(error) {
      console.error(error);
    }

    // Sets user data to firestore after succesful login
    private setUserDoc(user) {

      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

      const data: User = {
        uid: user.uid,
        email: user.email || null,
        photoURL: 'https://avatars3.githubusercontent.com/u/12459942?s=460&v=4'
      };
      return userRef.set(data);
    }


  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL || 'https://avatars3.githubusercontent.com/u/12459942?s=460&v=4'
    };

    return userRef.set(data, { merge: true });

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }
}
