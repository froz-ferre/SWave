import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { MenuComponent } from './menu/menu.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  declarations: [
    MenuComponent,
    ChatComponent
  ],
  exports: [
    MaterialModule,
    MenuComponent,
    ChatComponent,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
