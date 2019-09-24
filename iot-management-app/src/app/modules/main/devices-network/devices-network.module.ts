import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesNetworkRoutingModule } from './devices-network.routing';
import { DevicesNetworkService } from './devices-network.service';
import { DevicesNetworkComponent } from './devices-network.component';

@NgModule({
    declarations: [
        DevicesNetworkComponent
    ],
    imports: [
        CommonModule,
        DevicesNetworkRoutingModule
    ],
    providers: [
        DevicesNetworkService
    ]
})
export class DevicesNetworkModule { }
