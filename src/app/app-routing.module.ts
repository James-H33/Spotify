import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthorized } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [IsAuthorized],
    loadChildren: () => import('./modules/root/root.module').then(m => m.RootModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
