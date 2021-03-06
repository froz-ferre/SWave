import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app.routes.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { RouterModule, Routes } from '@angular/router';

import { CoreModule } from './core/core.module';

export const firebaseConfig = {
    apiKey: 'AIzaSyD04J1HQmN6UzvxJKtcqmBrNHuX6x0hvCQ',
    authDomain: 'samewave-3b523.firebaseapp.com',
    databaseURL: 'https://samewave-3b523.firebaseio.com',
    projectId: 'samewave-3b523',
    storageBucket: 'samewave-3b523.appspot.com',
    messagingSenderId: '716018657308'
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    CoreModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // SharedModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  exports: [ ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
