import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';

const userRoutes: Routes = [
    { path: '', component: UserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
