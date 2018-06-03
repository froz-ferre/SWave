import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full' },
    {
        path: 'dashboard',
        loadChildren: './core/dashboard/dashboard.module#DashboardModule',
    },
  /*  {
        path: '**',
        component: NotFoundComponent
    }  */
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
