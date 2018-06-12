import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopArtistComponent } from './dashboard/top-artist/top-artist.component';
import { TopArtisTracksComponent } from './dashboard/top-artis-tracks/top-artis-tracks.component';
import { ChartComponent } from './dashboard/chart/chart.component';

import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './dashboard/search/search.component';
import { AuthComponent } from './users/auth/auth.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChatComponent } from '../shared/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
},
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'direct',
    component: ChatComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    TopArtistComponent,
    TopArtisTracksComponent,
    ChartComponent,
    SearchComponent,
    AuthComponent,
    UserProfileComponent
  ],
  providers: [
    AuthService
  ],
  exports: [
    SharedModule
  ]
})
export class CoreModule { }
