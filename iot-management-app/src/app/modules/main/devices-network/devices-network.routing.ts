import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesNetworkComponent } from './devices-network.component';

const devicesNetworkRoutes: Routes = [
    { path: '', component: DevicesNetworkComponent }
];

@NgModule({
    imports: [RouterModule.forChild(devicesNetworkRoutes)],
    exports: [RouterModule]
})
export class DevicesNetworkRoutingModule { }
