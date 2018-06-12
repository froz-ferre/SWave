import { SharedModule } from './../shared.module';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: SharedModule
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  conversations: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
      this.itemsCollection = afs.collection<any>('conversations');
      this.conversations = this.itemsCollection.valueChanges();
  }

  someMeth() {
    this.itemsCollection = this.afs.collection<any>('conversations');
    return this.itemsCollection.valueChanges();
  }

}
