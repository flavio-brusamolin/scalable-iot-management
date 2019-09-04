import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

import { RoleGuard } from 'src/app/core/guards/role/role.guard';

const mainRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [RoleGuard],
        data: { expectedRole: 'admin' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
