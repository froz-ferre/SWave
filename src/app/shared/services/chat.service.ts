import { filter, switchMap, map } from 'rxjs/operators';
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
      this.conversations.subscribe(
        res => {
          res.forEach(el => {
            if (el.uid.indexOf('3') !== -1 && el.uid.indexOf('1') !== -1) {
              this.thread = el.id;
            }
          });
        },
        () => {},
        () => {
          return this.thread;
        }
      );
      /*
        (3) […]
          0: {…}
          uid: Array [ "1", "3" ]
          __proto__: Object { … }
          1: Object {  }
          2: {…}
          uid: Array [ "3", "1" ]
          __proto__: Object { … }
          length: 3
          __proto__: Array []
      */
    }
}
