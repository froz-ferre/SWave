import { filter, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface User {
  uid: string;
}

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  conversations: Observable<any>;

  public users;
  auth;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
  }

  // someMeth() {
  //   this.itemsCollection = this.afs.collection<any>('conversations');
  //   return this.itemsCollection.valueChanges();
  // }

    getAuth() {
      return this.afAuth.user;
    }

    getUsers() {
      return this.afs.collection('users').valueChanges();
    }
}
