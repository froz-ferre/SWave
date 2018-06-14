import { filter, switchMap, map, take, find } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


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
              private afs: AngularFirestore,
              private router: Router) {
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
      return this.afs.collection(`conversations`).doc(thread).collection('messages', ref => ref.orderBy('createdAt')).valueChanges();
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
      // Идем на сервак, смотрим существующие потокu

      this.conversations.pipe(map((res: Array<any>) => {
        this.thread = res.filter(el => el.uid.indexOf(this.auth.uid) !== -1 && el.uid.indexOf(otherUserId) !== -1);
      }), take(1)).subscribe(
        {
          complete: () => {
          // Если находим поток с айдишником чувака и текущей сессии
          if (this.thread.length !== 0) {
          // то возвращаем поток и редиректим на него
            this.router.navigate([`/direct/thread/${this.thread[0].id}`]);
          } else {
            // Иначе создаем такой поток, возвращаем его и, соответственно, редиректим
            this.afs.collection('conversations').add({
              uid: [this.auth.uid, otherUserId]
            });
          }

          }
        }
      );
    }
}
