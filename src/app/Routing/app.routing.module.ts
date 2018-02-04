import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../Core/components/home/home.component';
import { LoadingComponent } from '../Core/components/loading/loading.component';
import { ProfileComponent } from '../Core/components/profile/profile.component';
import { NotFoundComponent } from '../Core/components/not-found/not-found.component';

import { AuthGuard } from '../Shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
