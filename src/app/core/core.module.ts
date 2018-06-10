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

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    TopArtistComponent,
    TopArtisTracksComponent,
    ChartComponent,
    SearchComponent,
    AuthComponent,
    UserProfileComponent
  ]
})
export class CoreModule { }
