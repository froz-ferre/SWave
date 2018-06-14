import { filter, switchMap, map, take, find } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';


export interface User {
  uid: string;
}

export interface Thread {
  uid: Array<any>;
}

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  conversations: Observable<any>;

  public users;
  auth;
  thread;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
    this.getAuth().subscribe( auth => this.auth = auth);
    this.itemsCollection = afs.collection('conversations');
    this.conversations = this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    })
    );
  }

  // someMeth() {
  //   this.itemsCollection = this.afs.collection<any>('conversations');
  //   return this.itemsCollection.valueChanges();
  // }

  getConversations() {
    return this.conversations;
  }

    getAuth() {
      return this.afAuth.user;
    }

    getUsers() {
      return this.afs.collection('users').valueChanges();
    }

    getMessages(thread: string) {
      return this.afs.collection(`conversations`).doc(thread).collection('messages').valueChanges();
    }

    sendMessage(text, thread) {
      this.afs.collection('conversations').doc(thread).collection('messages').add({
        createdAt: Date.now(),
        message: text,
        sender: {
          displayName: this.auth.displayName || null,
          email: this.auth.email || null,
          photoURL: this.auth.photoURL,
          uid: this.auth.uid
        }
      });
    }

    startDirectThread(otherUserId) {
      // получаем айдишник того, с кем хотим потрепаться.
      // Идем на сервак, смотрим существующие потоки
      // Если находим поток с айдишником чувака и текущей сессии
      // то возвращаем поток и редиректим на него
      // Иначе создаем такой поток, возвращаем его и, соответственно, редиректим
      return this.conversations.pipe(take(1), map((res: Array<any>) => {
        // tslint:disable-next-line:no-unused-expression
        res.find(el => el.uid.indexOf(otherUserId) !== -1 && el.uid.indexOf(this.auth.id) !== -1).id;
      }));
    }
}
