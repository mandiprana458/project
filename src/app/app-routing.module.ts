import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/core/guards/auth.guard';
import { P404Component } from 'src/views/error/404.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../views/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'users',
    loadChildren: () => import('../views/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: P404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
