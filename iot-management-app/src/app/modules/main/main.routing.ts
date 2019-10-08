import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

import { RoleGuard } from 'src/app/core/guards/role/role.guard';

/* main routes */
const mainRoutes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: '', redirectTo: 'devices-network', pathMatch: 'full' },
      { path: 'devices-network', loadChildren: () => import('./devices-network/devices-network.module').then(m => m.DevicesNetworkModule) },
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
